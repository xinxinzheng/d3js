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
        this.colors = '';  
        // this.socket();   
        this.nodeData = [{id:200,color:'red'},{id:201,color:'orange'},{id:202,color:'yellow'},{id:203,color:'green'},{id:204,color:'cyan'},{id:205,color:'blue'}];
        this.linesData = {
            nodes:[//节点
                { name:"Adam",weight:1},
                { name:"Bob",weight:2},
                { name:"Carride",weight:2},
                { name:"Donovan",weight:3},
                { name:"Edward",weight:4},
                { name:"Felicity",weight:3},
                { name:"George",weight:2},
                { name:"Hannah",weight:1},
                { name:"Iris",weight:5},
                { name:"Jerry",weight:4} 
            ],
            edges:[//边
                { source:0,target:1,weight:1,color:1},
                { source:0,target:2,weight:3,color:4},
                { source:0,target:3,weight:4,color:6},
                { source:0,target:4,weight:6,color:65},
                { source:1,target:5,weight:3,color:76},
                { source:2,target:5,weight:8,color:879},
                { source:2,target:5,weight:7,color:989},
                { source:3,target:4,weight:9,color:643},
                { source:5,target:8,weight:1,color:54},
                { source:5,target:9,weight:3,color:54}, 
                { source:6,target:7,weight:4,color:45},
                { source:7,target:8,weight:0,color:43},
                { source:2,target:8,weight:8,color:243},
                { source:3,target:8,weight:1,color:43},
                { source:5,target:8,weight:5,color:13},
                { source:6,target:8,weight:3,color:351},
                { source:8,target:9,weight:4,color:1}
            ]
        };
    }

    renderForce(){
        // let canvas = d3.select(".force").attr('width','100%').attr('height','100%').getContext('2d');
        let ele = document.getElementById("forcecharts");
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

    renderLines(){
        this.colors = d3.schemeCategory20;
        //(1)转化数据为适合生成力导向图的对象数组
        let svg = d3.select("#forceline")
        .append("svg")
        .attr("width",'100%')
        .attr("height",'100%')
        .style('padding',this.padding);
        // let ctx = ele.getContext('2d');
        let force = d3.forceSimulation().force('charge',d3.forceManyBody().strength(-200)).force('center',d3.forceCenter(200,150));
        force.nodes(this.linesData.nodes);//加载节点数据
        force.force('link',d3.forceLink().links(this.linesData.edges).distance(50))//加载边数据
        // .size([width,height])//设置有效空间的大小
        force.restart();//设置生效

        //(2)创建作为连线的svg直线
        let edges = svg.selectAll("line")
            .data(this.linesData.edges)
            .enter()
            .append("line")
            .style("stroke",(d) => {//  设置线的颜色
                return this.colors[d.color];
            })
            .style("stroke-width",(d,i) => {//设置线的宽度
                return d.weight;
            });

        let nodes = svg.selectAll("circle")
            .data(this.linesData.nodes)
            .enter()
            .append("circle")
            .attr("r",(d) => {//设置圆点的半径，圆点的度越大weight属性值越大，可以对其做一点数学变换
                let r = Math.log(d.weight)*10;
                return r;
            })
            .style("fill",(d) => {
                let c = Number(d.weight*d.weight*d.weight);
                return this.colors[c];
            })
            .call(d3.drag);//可以拖动

         //(5)打点更新，没有的话就显示不出来了
        force.on("tick",function(){
            //边
            edges.attr("x1",function(d){
                return  d.source.x;
            })
            .attr("y1",function(d){
                return  d.source.y;
            })
            .attr("x2",function(d){
                return  d.target.x;
            })
            .attr("y2",function(d){
                return  d.target.y;
            });

            //节点
            nodes.attr("cx",function(d){
                return d.x;
            })
            .attr("cy",function(d){
                return d.y;
            });
        })

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
        let y = d3.scaleLinear().domain([0, max]).range([0,maxs]);
        let axis  = d3.axisLeft(y);
        ele.append('g').attr('transform','translate(20,280)').call(axis);
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
            this.renderLines();
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
                <div className="force">
                  <svg className="forcecharts" id="forceline" />
                </div>
            </div>
        )
    }
}