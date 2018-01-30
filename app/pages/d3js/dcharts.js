/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-30 15:33:47
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import BarDcharts from './bar'
import LineDcharts from './lines'
import ForceDcharts from './force'
import CanvasForceDcharts from './cforce'
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
    }
 
    socket(){
        this.socket = new WebSocket('ws://10.16.77.216:30002/index.php');
        this.socket.onopen = function(evt){
            console.log(evt,'open');
        }
        this.socket.onmessage = function(evt,data){
            console.log(evt,'message',data);
        }
        this.socket.onclose = function(evt){
            console.log(evt,'close');
        }
        this.socket.onerror = function(evt){
            console.log(evt,'error');
        }
    }

    componentDidMount() {
       
    }

    render() {
        return ( 
            <div className = "dcharts" >
                <div className="flex-row">
                    <BarDcharts />
                    <CanvasForceDcharts />
                    <ForceDcharts />
                </div>
                <div className="flex-row">
                    <LineDcharts />
                </div>
            </div>
        )
    }
}