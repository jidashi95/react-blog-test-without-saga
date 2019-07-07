import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import moment from "moment"
import { Field, reduxForm, getFormValues, SubmissionError } from "redux-form"
import { Row, Col, Button, Form } from "react-bootstrap"
import { withRouter } from "react-router"

import {InputField, DateTimeField} from "../components/formItems"
import { getMeal, updateMeal, createMeal, getRegularUsers } from "../actions/api"
import ErrorAlert from "../components/errorAlert"
import { isRequired, isPositiveInteger } from "../helpers"

const isDateTime = (value) => !(moment(value).isValid()) && "Not DateTime Format"

class Meal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: null
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    getMeal: PropTypes.func,
    updateMeal: PropTypes.func,
    createMeal: PropTypes.func,
    getRegularUsers: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
    const { getMeal, getRegularUsers, id, user} = this.props
    if(id !== 'new') {
      getMeal(id).catch(error => this.setState({errors:[error.message]}) )
    }

    if(user.role === 'admin') {
      getRegularUsers()
    }
  }

  submit = (values) => {
    const { history, createMeal, updateMeal, id} = this.props
    let promise;
    if(id === 'new') {
      promise = createMeal(values)
    } else {
      promise = updateMeal(id, values)
    }
    return promise
      .then((res) => history.push("/meals"))
      .catch(res => {
        this.setState({errors: [res.message]})
        throw new SubmissionError(res.errors)
      })
  }

  render() {
    const { handleSubmit, id, user, regularUsers, submitting } = this.props
    const { errors } = this.state
    let verb = id === 'new' ? 'Create' : 'Update'

    let userOptions = regularUsers.map((r) => ({
      value: r.id,
      label: r.email + " (" + r.name + ")"
    }))

    userOptions.unshift({label:'Please select any'})

    return (
      <div>
        <h2 className="text-center">{verb} Meal</h2>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Form onSubmit={handleSubmit(this.submit)}>
            { user.role === "admin" && 
              <Field
                name="user_id"
                label="User"
                componentClass="select"
                placeholder="User"
                validate={isRequired}
                component={InputField}
                options={userOptions}
              /> }
              <Field
                name="taken_at"
                label="Date Time"
                type="text"
                placeholder="YYYY-MM-DD HH:mm:ss"
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm:ss"
                validate={[isRequired, isDateTime]}
                component={DateTimeField}
                utc={true}
              />
              <Field
                name="name"
                label="Name"
                type="text"
                placeholder="Name"
                validate={[isRequired]}
                component={InputField}
              />
              <Field
                name="calories"
                label="Calories"
                type="number"
                placeholder="Calories"
                validate={[isRequired, isPositiveInteger]}
                component={InputField}
              />
              <div className="text-center">
                <Button type="submit" disabled={submitting}>{verb}</Button>
              </div>
            </Form>
            <br />
            {errors && <ErrorAlert errors={errors} />}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getMeal,
  updateMeal,
  createMeal,
  getRegularUsers,
}

const mapStateToProps = (state, ownProps) => ({
  mealsData: state.entities.meals_data,
  user: state.entities.user,
  initialValues: ownProps.match.params.id === 'new' ? {} : state.entities.meal,
  id: ownProps.match.params.id,
  regularUsers: state.entities.regular_users || [],
  formValues: getFormValues("meal-form")(state),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "meal-form",
    enableReinitialize: true,
  }),
  withRouter
)(Meal)
