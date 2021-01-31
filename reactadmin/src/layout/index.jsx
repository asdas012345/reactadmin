import React,{Suspense,lazy} from 'react'
import { Switch, Route ,Redirect,Link,withRouter } from 'react-router-dom';
import { Layout,Spin,Menu, Dropdown, Breadcrumb} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined 
} from '@ant-design/icons';
import SildeMenu from './components/SildeMenu'
import Page404 from '../layout/page404'
// import Home from '../views/home/index';
// import Banner from '../views/banner/index';
// import Cart from '../views/cart/index';
import Order from '../views/order/index';
// import ProList from '../views/pro/index';
// import ProHotList from '../views/pro/hot';
// import Userlist from '../views/user/index';
import UserAdminlist from '../views/user/admin';
import NoPer from '../views/NoPer/index';
const { Header, Sider, Content } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  menu = (
    <Menu onClick = { (val) => {
      console.log(val)
      if (val.key === 'logout'){
        sessionStorage.clear()
        this.props.history.replace('/login')
      }
    }}>
      <Menu.Item key="logout">
          退出
      </Menu.Item>
    </Menu>
  )

  render() {
    const breadcrumbNameMap = {
      '/home': '系统首页',
      '/pro': '产品管理',
      '/pro/list': '产品列表',
      '/pro/hotlist': '热推产品',
      '/banner': '轮播图管理',
      '/user': '用户管理',
      '/user/list': '用户列表',
      '/user/admin': '管理员列表',
      '/cart': '购物车管理',
      '/order': '订单管理',
    }
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img src='https://www.baidu.com/img/flexible/logo/pc/result@2.png' alt=""/>
          </div>
          <SildeMenu/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
             <div style={{ position: 'absolute', right: '10px', top: '0'}}>
            <Dropdown overlay={this.menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Hover me <DownOutlined />
              </a>
            </Dropdown>
            </div>
          </Header>
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {/* 加载动画 实验阶段 */}
            <Suspense fallback={<div style={{ position:'fixed',top:'50%',left:'50%'}}><Spin size="large"/></div>}>
              <Switch>
                {/* // 路由懒加载 */}
                <Route path="/home" component = { lazy(()=>import('./../views/home/index')) } />
                <Route path="/banner" component = { lazy(()=>import('./../views/banner/index')) } />
                <Redirect path="/cart" exact to="/cart/list"/>
                <Route path="/cart" component = { lazy(()=>import('./../views/cart/index')) } />
                <Route path="/order">
                  {
                    sessionStorage.getItem('role')*1 >=2 ?<Order/>:<NoPer/>
                  }
                </Route>
                <Redirect path="/pro" exact to="/pro/list"/>
                <Route path="/pro/list" component = { lazy(()=>import('./../views/pro/index')) } />
                <Route path="/pro/hotlist" component = { lazy(()=>import('./../views/pro/hot')) } />
                <Redirect path="/user" exact to="/user/list"/>
                <Route path="/user/list" component = {lazy(()=>import('./../views/user/index')) } />
                <Route path="/user/admin">
                  {
                    sessionStorage.getItem('role')*1 >=2 ?<UserAdminlist/>:<NoPer/>
                  }
                </Route>
                <Redirect path="/" exact to="/home"/>
                <Route component={Page404}/>
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(Index)