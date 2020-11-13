/*
 * @Author: mikey.wf 
 * @Date: 2020-11-02 15:07:10 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-12 17:07:16
 */
import React, { useState, useEffect } from 'react';
import marked from 'marked'
import '../static/css/AddArticle.scss'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath, { $get } from '../config/apiUrl'
import moment from 'moment';
const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别

  useEffect(() => {
    getTypeInfo()

    let tmpId = props.match.params.id
    if (tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getArticleById = (id) => {
    $get(servicePath.getArticleById + id).then(
      res => {
        console.log(res)
        let articleData = res.data.data[0]
        setArticleTitle(articleData.title)
        setArticleContent(articleData.article_content)
        let html = marked(articleData.article_content)
        setMarkdownContent(html)
        setIntroducemd(articleData.introduce)
        let tmpInt = marked(articleData.introduce)
        setIntroducehtml(tmpInt)
        setShowDate(res.data.data[0].addTime)
        setSelectType(res.data.data[0].typeId)
      }
    )
  }

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  })

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true
    }).then(
      res => {
        if (res.data.data === '没有登录') {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(res.data.data)
        }
      }
    )
  }

  const selectTypeHandler = (value) => {
    setSelectType(value)
  }
  const saveArticle = () => {
    if (!selectedType) {
      message.error('必须选择文章类型')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    }
    else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    }
    else if (!introducemd) {
      message.error('文章简介不能为空')
      return false
    }
    else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let dateText = showDate.replace('-', '/')
    dataProps.addTimenew = (new Date(dateText).getTime()) / 1000
    dataProps.addTime = (new Date(dateText).getTime()) / 1000
    if (articleId === 0) {
      dataProps.view_count = 0
      axios({
        method: 'post',
        url: servicePath.addArticle,
        header: { 'Access-Control-Allow-Origin': '*' },
        data: dataProps,
        withCredentials: true
      }).then(res => {
        setArticleId(res.data.insertId)
        if (res.data.isSuccess) {
          message.success('文章保存成功')
        } else {
          message.error('文章保存失败')
        }
      })
    } else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        headers: { 'Access-Control-Allow-Origin': '*' },
        data: dataProps,
        withCredentials: true
      }).then(res => {
        if (res.data.isSuccess) {
          message.success('文章修改成功')
        } else {
          message.error('修改失败');
        }
      })
    }
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder="博客标题"
                value={articleTitle}
                onChange={e => { setArticleTitle(e.target.value) }}
                size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select value={selectedType} defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                value={articleContent}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" onClick={saveArticle} size="large">发布文章</Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                placeholder="文章简介"
              ></TextArea>
              <br /><br />
              <div className="introduce-html"
                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => {
                    setShowDate(dateString)
                  }}
                  placeholder="发布日期"
                  size="large"
                  value={moment(showDate)}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle