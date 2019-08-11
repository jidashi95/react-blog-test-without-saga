import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { Form } from "react-bootstrap"
import { withRouter } from "react-router"
import ErrorAlert from "../components/errorAlert"
import { login } from "../actions/api"
import "./sign.css"
import { MainButton, MainContainer, MainHeader, MainWidget } from "../components/MainComponents"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      email: '',
      password: '',
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    login: PropTypes.func,
    history: PropTypes.object
  };

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  submit = () => {
    const { history, login } = this.props;
    const { email, password } = this.state;
    const values = {
      email: email,
      password: password
    }

    return login(values).then( res => {
        history.push('/posts')
    }).catch(res => {
      this.setState({errors: ["Wrong email or password"] })
    })
  }

  render() {
    const { handleSubmit } = this.props
    const { errors } = this.state

    return (
      <MainContainer style={{backgroundImage: 'url("logo.jpg")'}}>
        <MainWidget>
        <Form onSubmit={handleSubmit(this.submit)}>
          <MainHeader>
            Log In
          </MainHeader>
          <div className="InputContainerL">
            <label>Must be a valid email address</label>
            <input 
            className="InputField" 
            placeholder="EmailAddress"
            value={this.state.email}
            onChange={this.handleEmailChange}
            type="text"
            name="email"/>
          </div>
          <div className="InputContainerL">
            <input 
            className="InputField" 
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type="password"
            name="password"/>
          </div>
          <div className="text-center">
            <MainButton type="submit">LOG IN</MainButton>
          </div>
          <div className="TextLink">
            <a href='/login'>FORGOT PASSWORD</a>|
            <a href='/register'>SIGN UP</a>
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
  login
}

export default compose(
  reduxForm({
    form: "login-form"
  }),
  withRouter,
  connect(null, mapDispatchToProps)
)(Login)
