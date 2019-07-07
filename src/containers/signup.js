import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import { Field, reduxForm, SubmissionError } from "redux-form"
import { Row, Col, Button, Form } from "react-bootstrap"
import { withRouter } from "react-router"
import { isValidEmail, isRequired } from "../helpers"
import {InputField} from "../components/formItems"
import ErrorAlert from "../components/errorAlert"
import { signup, login } from "../actions/api"


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    signup: PropTypes.func,
    history: PropTypes.object
  };

  submit = (values) => {
    const { history, signup } = this.props
    console.log( "here", values )
    return signup(values).then(res => {
      history.push('/login')
    }).catch( res => {
      this.setState({errors: res.errors.full_messages})
      throw new SubmissionError(res.errors)
    })
  }

  render() {
    const { handleSubmit, submitting } = this.props
    const { errors } = this.state

    return (
      <div>
        <h2 className="text-center">Create an account</h2>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Form onSubmit={handleSubmit(this.submit)}>
              <Field
                name="email"
                label="Email"
                type="text"
                placeholder="Email"
                validate={[isRequired, isValidEmail]}
                component={InputField}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                validate={isRequired}
                component={InputField}
              />
              <Field
                name="password_confirm"
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                component={InputField}
              />
              <div className="text-center">
                <Button type="submit" disabled={submitting}>Register</Button>
              </div>
            </Form>
            <br />
            {errors && (<ErrorAlert errors={errors} /> )}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = {
  signup
}

const validate = (values) => {
  const errors = {}
  if (values.password !== values.password_confirm) {
    errors.password_confirm = "Password does not match"
  }
  return errors
}

export default compose(
  reduxForm({
    form: "signup-form",
    validate
  }),
  withRouter,
  connect(null, mapDispatchToProps)
)(Signup)
