/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-30 16:01:31
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
export default class SplashedDcharts extends Component {
    constructor(props) {
        super(props);
        this.colors = d3.schemeCategory20;
        this.data =  [[0.5, 0.5],[0.7, 0.8],[0.4, 0.9],[0.11, 0.32],[0.88, 0.25],[0.75, 0.12],[0.5, 0.1],[0.2, 0.3],[0.4, 0.1]];
        this.padding = {left:40,right:20,top:20,bottom:20};
        this.addEle = this.addEle.bind(this); 
    }

    renderCharts() {
        let layout = d3.select('#spalshed');
        let w = parseInt(layout.style('width'));
        let h = parseInt(layout.style('height'));
        let xmax = d3.max(this.data,(d) => {
            return d[0];
        })
        let ymax = d3.max(this.data,d => {
            return d[1];
        })
        let xScale = d3.scaleLinear().domain([0,1]).range([this.padding.left,w - this.padding.right]);
        let xAxis = d3.axisBottom(xScale);
        let yScale = d3.scaleLinear().domain([0,1]).range([h - this.padding.top,0]);
        let yAxis = d3.axisLeft(yScale);

        let ele = d3.select("#spalshed").append('svg').style('width','100%').style('height','100%');
        let update = ele.select('circle').data(this.data);
        let enter = update.enter();
        let exit = update.exit();

        update.attr('cx',(d) => {
            return xScale(d[0]);
        }).attr('cy', d => {
            return yScale(d[1]);
        }).attr('r',(d) => {
            return (x + y) / 2 ;
        })

        enter.append('circle').attr('cx',(d) => {
            console.log(xScale(d[0]));
            return xScale(d[0]);
        }).attr('cy', d => {
            console.log(xScale(d[1]));
            return yScale(d[1]);
        }).attr('r',(d) => {
            return (d[0] + d[1]) / 2 ;
        }).attr('fill',(d , i)=> {
            return this.colors[i]
        })

        exit.remove();

        ele.append('g').attr('transform','translate(' + 0 + ',' + (h - this.padding.bottom) + ')').call(xAxis);
        ele.append('g').attr('transform','translate(' + this.padding.left + ',' + 0 + ')').call(yAxis);

    }

    //添加元素
    addEle(){
        // let n = Math.random() * 150;
        // this.data.push(n.toFixed(0));
        // this.updateCharts();
    }

    updateEle(){

    }

    deleteEle(){

    }

    componentDidMount() {
        setTimeout(() => {
            this.renderCharts();
        }, 500)
    }

    render() {
        return ( 
            <div className="spalshed">
                <div className = "charts" id = "spalshed" />
                <button onClick={this.addEle}>添加元素</button>
            </div>
        )
    }
}