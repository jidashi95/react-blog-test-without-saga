import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

export const pathsByRole = {
  regular: ["/users/me", "/meals"],
  manager: ["/users"],
  admin: ["/users", "/meals"]
}

class AuthRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
  }
  renderByRole = (props) => {
    const { user, component: Component } = this.props
    let redirectPath
    
    if(user.role) {
      let paths = pathsByRole[user.role]
      redirectPath = (paths && paths.some(item => props.location.pathname.startsWith(item))) ? false : '/users/me'
    } else {
      redirectPath = '/login'
    }
    return redirectPath ? <Redirect to={{
      pathname: redirectPath,
      state: { from: props.location }
    }}/> : <Component {...props}/>
  }
  render() {
    const { auth, component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={this.renderByRole}/>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.entities.auth || {},
  user: state.entities.user || {},
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
