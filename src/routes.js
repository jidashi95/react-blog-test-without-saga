import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRoute from './components/authRoute'
import Login from './containers/login'
import Signup from './containers/signup'
import Header from './containers/header'
import Users from './containers/users'


export default (
  <Router>
  <div>
  <Header />
  <Switch>
  <Route path="/login" component={Login} />
  <Route path="/register" component={Signup} />
  <Route path="/" component={Users} />
  </Switch>
  </div>
  </Router>
)