/*
 * @Author: mikey.wf 
 * @Date: 2020-10-13 14:31:20 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-06 08:56:30
 */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'


function Main() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/login/" component={Login} />
      <Route path="/index/" component={AdminIndex} />
    </Router>
  )
}

export default Main