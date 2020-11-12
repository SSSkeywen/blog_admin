/*
 * @Author: mikey.wf
 * @Date: 2020-10-13 15:52:58
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-12 15:31:26
 */
import React, { useState } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  // TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.scss'
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = e => {
    console.log(props.history)
    if (e.key === '/index/add') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark"
          selectedKeys={[props.history.location.pathname]}
          defaultSelectedKeys={['1']}
          onClick={handleClickArticle}
          mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
            </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            添加文章
            </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
            <Menu.Item key="/index/add">添加文章</Menu.Item>
            <Menu.Item key="/index/list">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} >留言管理</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list" component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Wenfei.com</Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(AdminIndex)