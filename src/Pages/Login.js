/*
 * @Author: mikey.wf 
 * @Date: 2020-10-13 14:30:25 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-03 16:46:33
 */
import React, { useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import 'antd/dist/antd.css'
import { Card, Input, Button, Spin, message } from 'antd'
import {
  UserOutlined,
} from '@ant-design/icons';
import '../static/css/Login.scss'
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props) {
  // eslint-disable-next-line
  const [userName, setUserName] = useState('')
  // eslint-disable-next-line
  const [password, setPassWord] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    // setTimeout(() => {
    //   props.history.push('/index')
    //   setIsLoading(false)
    // }, 1000)
    if (!userName) {
      message.error('用户名不能为空')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    } else if (!password) {
      message.error('密码不能为空')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    }
    let dataProps = {
      'userName': userName,
      'password': password,
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true, // 共享session
    }).then(
      res => {
        setIsLoading(false)
        if (res.data.data === '登录成功') {
          localStorage.setItem('openId', res.data.openId)
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      }
    )
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