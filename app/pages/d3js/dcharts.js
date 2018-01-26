/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-26 14:50:07
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import d3 from 'd3'


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
  
  renderCharts(obj){
    
  }

  componentDidMount() {
    setTimeout(() => {
      // this.loadChart()
    }, 500)
  }

  render() {
    return (
      <div className="dcharts">
        <div className="dcharts" />
      </div>
    )
  }
}
