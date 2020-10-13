/*
 * @Author: mikey.wf 
 * @Date: 2020-10-13 14:31:20 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-10-13 15:23:13
 */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'


function Main() {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
    </Router>
  )
}

export default Main