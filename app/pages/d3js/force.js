/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-30 15:41:39
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
export default class ForceDcharts extends Component {
    constructor(props) {
        super(props)
        this.data = [45,67,83,23,78,12,100];
        this.stepWidth = 45;
        this.width = 40;
        this.height = 300;
        this.padding = {left:40,right:20,top:20,bottom:20};
        this.addEle = this.addEle.bind(this);
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

    renderCharts(){
        this.colors = d3.schemeCategory20;
        //(1)转化数据为适合生成力导向图的对象数组
        let svg = d3.select("#force")
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
                  <svg className="charts" id="force" />
                  <button onClick={this.addEle}>添加元素</button>
            </div>
        )
    }
}