import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

class AuthRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.string,
  }
  render() {
    const { auth, component: Component } = this.props;
    
    return (
      <Route render={props =>
        auth && localStorage.getItem('auth') == auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      } />
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.entities.auth || {},
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
