/*
 * @Author: mikey.wf 
 * @Date: 2020-10-13 14:30:25 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-02 10:21:51
 */
import React, { useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import 'antd/dist/antd.css'
import { Card, Input, Button, Spin } from 'antd'
import {
  UserOutlined,
} from '@ant-design/icons';
import '../static/css/Login.scss'

function Login(props) {
  // eslint-disable-next-line
  const [userName, setUserName] = useState('')
  // eslint-disable-next-line
  const [passWord, setPassWord] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      props.history.push('/index')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="login-div">

      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Baimantou blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <br /><br />
          <Input.Password
            id="passWord"
            size="large"
            placeholder="Enter your passWord"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setPassWord(e.target.value) }}
          />
          <br /><br />
          <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
        </Card>
      </Spin>

    </div>
  )
}

export default withRouter(Login)