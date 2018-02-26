/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-23 17:11:20
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
export default class LineDcharts extends Component {
    constructor(props) {
        super(props);
        this.colors = d3.schemeCategory10;
        this.data = [[
            {date: 2007, value: 45.24},
            {date: 2008, value: 64.35},
            {date: 2009, value: 70.84},
            {date: 2010, value: 34.92},
            {date: 2011, value: 50.80},
            {date: 2012, value: 80.47},
            {date: 2013, value: 65.52},
            {date: 2014, value: 78.40},
            {date: 2015, value: 87.37},
            {date: 2016, value: 54.27}
        ]];
        this.padding = {left:40,right:20,top:20,bottom:20};
    }

    renderCharts() {
        let layout = d3.select('.lines');
        let w = parseInt(layout.style('width'));
        let h = parseInt(layout.style('height'));

        let ele = d3.select("#lines").append('svg').style('width',w).style('height',h).style('padding',this.padding);
        //x坐标轴比例尺
        let max = this.data.map(row => {
            return d3.max(row,(d) => {
                return d.date;
            })
        })
        max = d3.max(max);
        let min = this.data.map(row => {
            return d3.min(row,(d) => {
                return d.date;
            })
        })
        min = d3.min(min);
        
        let xScale = d3.scaleLinear().domain([min,max]).range([this.padding.left,w - this.padding.right]);
        let xaxis = d3.axisBottom(xScale);
        //y坐标轴比例尺
        let ymax = this.data.map(row => {
            return d3.max(row,(d) => {
                return d.value;
            })
        })
        ymax = d3.max(ymax);
        let yScale = d3.scaleLinear().domain([0,ymax * 1.1]).range([h - this.padding.top - this.padding.bottom,this.padding.bottom]);
        let yaxis = d3.axisLeft(yScale);

        //线数据生成器
        let lineg = d3.line().x(d => {
            return xScale(d.date);
        }).y(d => {
            return yScale(d.value)
        })

        ele.selectAll('path').data(this.data).enter().append('path').attr('transform','translate(' + 0 + ',' + this.padding.bottom + ')')
        .attr('d', d => {
            return lineg(d);
        }).attr('fill','none').attr('stroke-width',2).attr('stroke',(d,i) => {
            return this.colors[i];
        })

        ele.append('g').attr('transform','translate(' + 0 + ',' + (h - this.padding.bottom) + ')').call(xaxis)
        ele.append('g').attr('transform','translate(' + this.padding.left + ',' + this.padding.top + ')').call(yaxis)
        
    }
    //更新折线图
    updateCharts(){
       
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderCharts();
        }, 500)
    }

    render() {
        return ( 
            <div className="lines">
                <div className = "charts" id = "lines" />
            </div>
        )
    }
}