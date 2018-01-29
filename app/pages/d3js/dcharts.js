/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-29 15:22:38
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
        this.data = [45,67,83,23,78,12];
        this.stepWidth = 45;
        this.width = 40;
        this.height = 300;
        this.padding = {left:20,right:20,top:20,bottom:20};
        this.addEle = this.addEle.bind(this);
        this.sorts = this.sorts.bind(this);     
        // this.socket();   
        this.nodeData = [{id:500,color:'red'},{id:501,color:'orange'},{id:502,color:'yellow'},{id:503,color:'green'},{id:504,color:'cyan'},{id:505,color:'blue'}];
    }

    renderForce(){
        // let canvas = d3.select(".force").attr('width','100%').attr('height','100%').getContext('2d');
        let ele = document.getElementById("forcecharts");
        let ctx = ele.getContext('2d');
        let width = ele.width;
        let height = ele.height;
        let nodes = this.nodeData;
        let simulation = d3.forceSimulation().force('charge',d3.forceManyBody()).force('center',d3.forceCenter(width / 2 , height / 2));
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

    renderCharts() {
        let ele = d3.select('body').select('#cylinder').append('svg').attr('width','100%').attr('height','100%');
        //绘制矩形
        ele.selectAll('rect').data(this.data).enter().append('rect').attr('fill','blue').attr('x',(d ,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return this.height - this.padding.bottom - d;
        }).attr('height',(d,i) => {
            return d;
        }).attr('width',(d,i) => {
            return this.width;
        })
        //绘制文本
        ele.selectAll('text').data(this.data).enter().append('text').attr('font-size','14px').attr('text-anchor','middle').attr('x',(d,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return this.height - this.padding.bottom - d;
        }).attr('dx',(d,i) => {
            return this.width / 2;
        }).attr('dy',(d,i)=>{
            return '1em';
        }).attr('fill','white').text((d,i) => {
            return d;
        })
        let max = d3.max(this.data);
        let maxs = Number((max * 1.5).toFixed(0));
        //绘制坐标
        let x = d3.scaleLinear().domain(10, 130).range(0, 960);
        console.log(x.invert(80))
        // let axis  = d3.axisLeft(xScale);
        // console.log(xScale(30))
        // ele.append('g').attr('transform','translate(0,30)').call(axis);
    }

    updateCharts(){
        let ele = d3.select('body').select('svg');
        let enter = ele.selectAll('rect').data(this.data).enter();
        let update = ele.selectAll('rect').data(this.data); 
        let exit = ele.selectAll('rect').data(this.data).exit();
        let entert = ele.selectAll('text').data(this.data).enter();
        let updatet = ele.selectAll('text').data(this.data); 
        let exitt = ele.selectAll('text').data(this.data).exit();
        update.attr('height',(d,i) => {
            return d;
        })
        exit.remove();
        exitt.remove();
        enter.append('rect').attr('fill','blue').attr('x',(d ,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return this.height - this.padding.bottom - d;
        }).attr('height',(d,i) => {
            return d;
        }).attr('width',(d,i) => {
            return this.width;
        })
        entert.append('text').attr('font-size','14px').attr('text-anchor','middle').attr('x',(d,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return this.height - this.padding.bottom - d;
        }).attr('dx',(d,i) => {
            return this.width / 2;
        }).attr('dy',(d,i)=>{
            return '1em';
        }).attr('fill','white').text((d,i) => {
            return d;
        })
        update.attr('x',(d ,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return this.height - this.padding.bottom - d;
        }).attr('height',(d,i) => {
            return d;
        }).attr('width',(d,i) => {
            return this.width;
        })
        updatet.attr('x',(d ,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return this.height - this.padding.bottom - d;
        }).attr('dx',(d,i) => {
            return this.width / 2;
        }).attr('dy',(d,i)=>{
            return '1em';
        }).text((d,i) => {
            return d;
        })
    }

    addEle(){
        let n = Math.random() * 100;
        this.data.push(n.toFixed(0));
        this.updateCharts();
    }

    sorts(){
        this.data.sort(d3.ascending);
        this.updateCharts();
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderCharts();
            this.renderForce();
        }, 500)
    }

    render() {
        return ( 
            <div className = "dcharts" >
                <div className="bar">
                  <div className = "cylinder" id = "cylinder" />
                    <button onClick={this.addEle}>添加元素</button>
                    <button onClick={this.sorts}>排序元素</button>
                </div>
                <div className="force">
                  <canvas className="forcecharts" id="forcecharts" />
                </div>
            </div>
        )
    }
}