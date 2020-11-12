/*
 * @Author: mikey.wf 
 * @Date: 2020-11-10 11:03:49 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-12 14:33:30
 */
import React, { useState, useEffect } from 'react';
import '../static/css/ArticleList.scss'
import {
  // List, Row, Col,
  Modal,
  message,
  Button,
  Space,
  Table,
  // Switch
} from 'antd';
import axios from 'axios'
import servicePath, { $get } from '../config/apiUrl'
const { confirm } = Modal


function ArticleList(props) {

  const [list, setList] = useState([])

  const getList = () => {
    $get(servicePath.getArticleList).then(res => {
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
  // 修改文章
  const updateArticle = (id, checked) => {
    props.history.push('/index/add/' + id)
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
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => { updateArticle(record.id) }} type="primary">修改</Button>&nbsp;
          <Button onClick={() => { delArticle(record.id) }}>删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={list}
        columns={columns}
        rowKey={'id'} />
    </div>
  )
}
export default ArticleList