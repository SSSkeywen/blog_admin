/*
 * @Author: mikey.wf 
 * @Date: 2020-11-10 11:03:49 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-12 10:19:20
 */
import React, { useState, useEffect } from 'react';
import '../static/css/ArticleList.scss'
import {
  // List, Row, Col,
  Modal,
  Radio,
  Space,
  Table,
  message,
  Button,
  // Switch
} from 'antd';
import axios from 'axios'
import servicePath, { $get } from '../config/apiUrl'
const { confirm } = Modal


function ArticleList () {

  const [list, setList] = useState([])

  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
    }).then(res => {
      setList(res.data.list)
    })
    // $get(servicePath.getArticleList).then(res => {
    //   setList(res.data.list)
    // })
  }

  useEffect(() => {
    getList()
  }, [])

  // 删除文章的方法
  const delArticle = (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk () {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          res => {
            message.success('文章删除成功')
            getList()
          }
        )
      },
      onCancel () {
        message.success('没有任何操作')
      }
    })
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类别',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '发布时间',
      dataIndex: 'addTime',
      key: 'addTime',
    },
    {
      title: '集数',
      dataIndex: 'part_count',
      key: 'part_count',
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary">修改</Button>&nbsp;
          <Button onClick={() => { delArticle(record.id) }}>删除</Button>
        </Space>
      ),
    },
  ];
  // const [state, setState] = useState({
  //   size: 'Small'
  // })
  // const handleSizeChange = e => {
  //   setState({ size: e.target.value });
  // };
  return (
    <div>
      {/* <Radio.Group value={state.size} onChange={handleSizeChange}>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group> */}
      <Table dataSource={list} columns={columns} />
      {/* <List
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
      /> */}
    </div>
  )
}
export default ArticleList