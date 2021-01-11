/*
 * @Author: mikey.wf 
 * @Date: 2020-10-13 14:31:20 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2021-01-11 15:33:45
 */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
import NewTest from './NewTest'


function Main () {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/login/" component={Login} />
      <Route path="/index/" component={AdminIndex} />
      <Route path="/newtest/" component={NewTest} />
    </Router>
  )
}

export default Main