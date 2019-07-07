import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Row, Col, Button, Form } from "react-bootstrap"
import { withRouter } from "react-router"
import { isValidEmail, isRequired } from "../helpers"
import {InputField} from "../components/formItems"
import ErrorAlert from "../components/errorAlert"
import { login } from "../actions/api"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    login: PropTypes.func,
    history: PropTypes.object
  };

  submit = (values) => {
    const { history, login } = this.props
    return login(values).then( res => {
        history.push('/users')
    }).catch(res => {
      this.setState({errors: res.errors} )
    })
  }

  render() {
    const { handleSubmit, history } = this.props
    const { errors } = this.state

    return (
      <div>
        <h2 className="text-center">Welcome</h2>
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
              <div className="text-center">
                <Button type="submit">Log In</Button>
                <Button onClick={()=>{ history.push('/register')} }>Sign Up</Button>
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
  login
}

export default compose(
  reduxForm({
    form: "login-form"
  }),
  withRouter,
  connect(null, mapDispatchToProps)
)(Login)
