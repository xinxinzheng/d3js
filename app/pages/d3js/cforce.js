/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-30 15:41:56
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as d3 from 'd3'

@connect(
    (state, props) => ({
        config: state.config,
    }) 
)
export default class CanvasForceDcharts extends Component {
    constructor(props) {
        super(props)
        this.data = [45,67,83,23,78,12,100];
        this.stepWidth = 45;
        this.width = 40;
        this.height = 300;
        this.padding = {left:40,right:20,top:20,bottom:20};
        this.addEle = this.addEle.bind(this);
        this.nodeData = [{id:200,color:'red'},{id:201,color:'orange'},{id:202,color:'yellow'},{id:203,color:'green'},{id:204,color:'cyan'},{id:205,color:'blue'}];
    }

    renderCharts(){
        // let canvas = d3.select(".force").attr('width','100%').attr('height','100%').getContext('2d');
        let ele = document.getElementById("cforce");
        let ctx = ele.getContext('2d');
        let width = ele.width;
        let height = ele.height;
        let nodes = this.nodeData;
        let simulation = d3.forceSimulation().force('charge',d3.forceManyBody().strength(-10)).force('center',d3.forceCenter(width / 2 , height / 2));
        simulation.nodes(nodes).on('tick',ticked);
        function ticked(){
            ctx.clearRect(0,0,width,height);
            nodes.forEach(function(node){
                ctx.beginPath();
                ctx.fillStyle = node.color;
                ctx.arc(node.x,node.y,20,0,2*Math.PI);
                ctx.fill();
            })
        }
    }

    updateCharts(){
       
    }
    //添加元素
    addEle(){
        // let n = Math.random() * 150;
        // this.data.push(n.toFixed(0));
        // this.updateCharts();
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderCharts();
        }, 500)
    }

    render() {
        return ( 
            <div className="force">
                <canvas className="charts" id="cforce" />
            </div>
        )
    }
}