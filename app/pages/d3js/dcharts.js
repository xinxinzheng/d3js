/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-26 17:30:45
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as d3 from 'd3'
import "./d3.less";

@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class dcharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {

      },
    }
  }
  
  renderCharts(id,obj){
    console.log(d3);
    let ele = d3.select("#" + id);
    console.log(ele.style('color','red'));
  }

  componentDidMount() {
    setTimeout(() => {
      this.renderCharts('cylinder')
    }, 500)
  }

  render() {
    return (
      <div className="dcharts">
        <div className="cylinder" id="cylinder" />
      </div>
    )
  }
}
