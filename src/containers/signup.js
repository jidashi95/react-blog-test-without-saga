import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { Form } from "react-bootstrap"
import { withRouter } from "react-router"
import { isValidEmail, isRequired } from "../helpers"
import ErrorAlert from "../components/errorAlert"
import { signup } from "../actions/api"
import "./sign.css"
import { MainContainer, MainButton, MainHeader, MainWidget } from "../components/MainComponents"

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      email: '',
      password: '',
      password_confirm: '',
      termFlag: false,
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    signup: PropTypes.func,
    history: PropTypes.object
  };

  submit = () => {
    const { email, password, password_confirm, termFlag } = this.state;
    if( termFlag === false ) {
      alert("Please agree our terms and policy.");
      return;
    }

    if( password !== password_confirm ) {
      alert("Password and Confirm must be the same.")
      return;
    }

    const values = {
      email: email,
      password: password,
    }

    const { history, signup } = this.props
    return signup(values).then(res => {
      history.push('/login')
    }).catch( res => {
      this.setState({errors: ["Existing User"]})
    })
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handlePassConfirmChange = (e) => {
    this.setState({password_confirm: e.target.value});
  }
  
  handleTermFlagChange = () => {
    const { termFlag } = this.state;
    this.setState({termFlag: !termFlag});
  }

  render() {
    const { handleSubmit, submitting } = this.props
    const { errors } = this.state

    return (
      <MainContainer style={{backgroundImage: 'url("logo.jpg")'}}>
        <MainWidget>
          <Form onSubmit={handleSubmit(this.submit)}>
            <MainHeader>
              Sign Up
            </MainHeader>
            <div className="InputContainerS">
              <input 
              className="InputField" 
              name="email" 
              value={this.state.email}
              onChange={this.handleEmailChange}
              placeholder="EmailAddress"
              validate={[isRequired, isValidEmail]}/>
            </div>
            <div className="InputContainerS">
              <input 
              className="InputField" 
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              placeholder="Password"/>
            </div>
            <div className="InputContainerS">
              <input 
              className="InputField" 
              type="password"
              placeholder="Confirm Password"
              name="password_confirm"
              value={this.state.password_confirm}
              onChange={this.handlePassConfirmChange}/>
            </div>

            <div className="InputContainerS">
              <input type="checkbox"
              onChange={this.handleTermFlagChange}/>
              <span>I agree to the Terms & Conditions</span>
            </div>
            <div className="text-center">
              <MainButton type="submit" disabled={submitting}>SIGN UP</MainButton>
            </div>
            <div className="text-center" style={{fontSize:'10px'}}>
              <Link style={{color: 'grey'}} to='/login'>LOG IN</Link>
            </div>
          </Form>
          <br />
          {errors && (<ErrorAlert errors={errors} /> )}
        </MainWidget>
      </MainContainer>
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
