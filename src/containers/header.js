import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import { Link } from "react-router-dom"
import { Grid, Navbar, Nav, NavItem } from "react-bootstrap"
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import { logout } from "../actions/api"

class Header extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func
  }

  componentWillMount() {

  }

  logout = (e) => {
    const { logout } = this.props
    logout()
  }

  renderNavButtons() {
    const {user} = this.props
    return (
    (user) &&
    <Nav pullRight bsStyle="pills">
      {/*<IndexLinkContainer to="/users" activeClassName="active"><NavItem>Users</NavItem></IndexLinkContainer>*/}
      {/*<LinkContainer to="/meals" activeClassName="active"><NavItem>Meals</NavItem></LinkContainer>*/}
      <LinkContainer to="/login"><NavItem onClick={this.logout} >Logout</NavItem></LinkContainer>
    </Nav>
    )
  }

  renderNonUserButtons() {
    return (
      <Nav pullRight>
        <LinkContainer to="/login"><NavItem>Log In</NavItem></LinkContainer> 
        <LinkContainer to="/register"><NavItem>Register</NavItem></LinkContainer> 
      </Nav>
    )
  }
  render() {
    const { user } = this.props
    return (
      <div>
        <Navbar collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">User Management</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            { user ? this.renderNavButtons() : this.renderNonUserButtons()}
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.entities.user,
})

const mapDispatchToProps = {
  logout,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
