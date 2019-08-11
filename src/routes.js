import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRoute from './components/authRoute'
import Login from './containers/login'
import Signup from './containers/signup'
import Header from './containers/header'
import Users from './containers/users'
import Posts from './containers/posts'


export default (
  <Router>
  <div>
  <Header />
  <Switch>
  <Route path="/login" component={Login} />
  <Route path="/register" component={Signup} />
  <AuthRoute path="/users" component={Users} />
  <AuthRoute path="/posts" component={Posts} />
  </Switch>
  </div>
  </Router>
)