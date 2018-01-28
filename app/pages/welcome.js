/*
 * @Author: dupi
 * @Date: 2017-06-27 13:51:09
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-26 14:29:27
 */


import React, { Component } from 'react'
import { connect } from 'react-redux'


@connect(
    (state, props) => ({
      config: state.config,
    })
)
export default class welcome extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      data: {},
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }

  render() {
    return (
      <div className="welcome">
        <div className="content">
          <h2 className="title">go go study</h2>
          <div className="cylinder">
            <canvas id="cylinder"></canvas>
          </div>
        </div>
      </div>
    )
  }
}
