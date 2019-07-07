import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUsers } from '../actions/api'
import { Table, Row, Col } from 'react-bootstrap'
import { orderBy } from 'lodash'

import ErrorAlert from '../components/errorAlert'

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
    const { getUsers, usersData } = this.props
    getUsers()
    console.log( usersData )
  }

  sortUser = (column) => {
    
    const { sortOrder } = this.state;
    this.setState({sortOrder: 1 - sortOrder});
  }


  render() {
    const { usersData } = this.props
    const userData = orderBy( usersData, ["created_at"], [this.state.sortOrder ? 'asc' : 'desc'])
    console.log( "herer", userData )
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
                  <th onClick={() => this.sortUser(2)}>Created_at</th>
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
            {errors && <ErrorAlert errors={errors} />}
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
  usersData: state.entities.users_data
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Users)