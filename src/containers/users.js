import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUsers } from '../actions/api'
import { Table, Row, Col, Alert } from 'react-bootstrap'
import { orderBy } from 'lodash'

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      sortOrder: 0,
    }
  }

  static propsTypes = {
    getUsers: PropTypes.func,
    history: PropTypes.object
  };

  componentWillMount() {
    const { getUsers } = this.props
    getUsers()
  }

  sortUser = () => {    
    const { sortOrder } = this.state;
    this.setState({sortOrder: 1 - sortOrder});
  }


  render() {
    const { usersData } = this.props
    const { sortOrder } = this.state
    const userData = orderBy( usersData, ["created_at"], [sortOrder ? 'asc' : 'desc'])
    const createdAtTitle = "Created At" + (sortOrder ? "\u2193" : '\u2191')
    const {errors} = this.state
    return (
      <div>
        <h2 className="text-center">Users</h2>
        <Row>
          <Col xs={10} xsOffset={1}>`
            <br/>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Email</th>
                  <th onClick={() => this.sortUser(2)} ><span>{createdAtTitle}</span></th>
                </tr>
              </thead>
              <tbody>
                {userData && userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {errors && <Alert>{errors}</Alert>}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getUsers,
}

const mapStateToProps = (state) => ({
  usersData: state.entities.usersData
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Users)