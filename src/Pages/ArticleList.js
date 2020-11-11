/*
 * @Author: mikey.wf 
 * @Date: 2020-11-10 11:03:49 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-10 17:55:08
 */
import React, { useState, useEffect } from 'react';
import '../static/css/ArticleList.scss'
import {
  List, Row, Col,
  Modal,
  message,
  Button,
  Switch
} from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { confirm } = Modal


function ArticleList(props) {

  const [list, setList] = useState([])

  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(res => {
      setList(res.data.list)
    })
  }

  useEffect(() => {
    getList()
  }, [])

  // 删除文章的方法
  const delArticle = (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          res => {
            message.success('文章删除成功')
            getList()
          }
        )
      },
      onCancel() {
        message.success('没有任何操作')
      }
    })
  }

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>集数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <Row className="list-div">
            <Col span={8}>
              {item.title}
            </Col>
            <Col span={3}>
              {item.typeName}
            </Col>
            <Col span={3}>
              {item.addTime}
            </Col>
            <Col span={3}>
              共<span>{item.part_count}</span>集
          </Col>
            <Col span={3}>
              {item.view_count}
            </Col>
            <Col span={4}>
              <Button type="primary">修改</Button>&nbsp;
            <Button onClick={() => { delArticle(item.id) }}>删除</Button>
            </Col>
          </Row>
        )}
      />
    </div>
  )
}
export default ArticleList