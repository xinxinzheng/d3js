import React from 'react'
import {
  Route,
  IndexRoute,
} from 'react-router'
import App from './containers/App'
import Welcome from './pages/welcome'
// import Login from './containers/App/login'

// import {
//   houseCheck,
//   houseManage,
//   houseDetail,
//   roomDetail,
// } from './pages/house'

// import popCheck from './pages/pop/index'

// 表格列表
const table = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/table').default)
  }, 'table')
}

// 图表
const echarts = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/echarts').default)
  }, 'echarts')
}

// D3
const dcharts = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/d3js/dcharts').default)
  }, 'dcharts')
}

// WebGL
const webgl = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/webgl/webgl').default)
  }, 'webgl')
}
// 登录
const Login = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./containers/App/login').default)
  }, 'login')
}

// 注册
const Register = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./containers/App/register').default)
  }, 'register')
}

// 测试
const chat = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/chat').default)
  }, 'chat')
}
// 编辑器
const editor = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/editor').default)
  }, 'editor')
}

// kindEditor
// const kindEditor = (location, cb) => {
//   require.ensure([], require => {
//     cb(null, require('./pages/menu/kindEditor').default)
//   }, 'kindEditor')
// }

/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    replaceState('/login')
    // hashHistory.push('/login')
  }
}

const routes = (
  <Route>
    <Route path="/" component={App} onEnter={isLogin}>
      <IndexRoute component={Welcome} />
      <Route path="/table" getComponent={table} />
      <Route path="/echarts" getComponent={echarts} />
      <Route path="/editor" getComponent={editor} />
      <Route path="/dcharts" getComponent={dcharts} />
      <Route path="/webgl" getComponent={webgl} />
      <Route path="/chat" getComponent={chat} />

    </Route>
    <Route path="/login" getComponent={Login}></Route>
    <Route path="/register" getComponent={Register}></Route>
  </Route>
);

export default routes
