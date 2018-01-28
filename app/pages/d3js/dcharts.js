/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-26 18:30:02
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
        this.padding = {left:20,right:20,top:20,bottom:20};
        this.addEle = this.addEle.bind(this);
        this.sorts = this.sorts.bind(this);
    }

    renderCharts() {
        let ele = d3.select('body').select('#cylinder').append('svg').attr('width',400).attr('height',400);
        // ele.append('circle').attr('cx',50).attr('cy',50).attr('r',30).attr('fill','red');
        ele.selectAll('rect').data(this.data).enter().append('rect').attr('fill','blue').attr('x',(d ,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return 400 - this.padding.bottom - d;
        }).attr('height',(d,i) => {
            return d;
        }).attr('width',(d,i) => {
            return this.width;
        })
        ele.selectAll('text').data(this.data).enter().append('text').attr('font-size','14px').attr('text-anchor','middle').attr('x',(d,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return 400 - this.padding.bottom - d;
        }).attr('dx',(d,i) => {
            return this.width / 2;
        }).attr('dy',(d,i)=>{
            return '1em';
        }).attr('fill','white').text((d,i) => {
            return d;
        })
    }

    updateCharts(){
        let ele = d3.select('body').select('svg');
        // ele.append('circle').attr('cx',50).attr('cy',50).attr('r',30).attr('fill','red');
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
            return 400 - this.padding.bottom - d;
        }).attr('height',(d,i) => {
            return d;
        }).attr('width',(d,i) => {
            return this.width;
        })
        entert.append('text').attr('font-size','14px').attr('text-anchor','middle').attr('x',(d,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return 400 - this.padding.bottom - d;
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
            return 400 - this.padding.bottom - d;
        }).attr('height',(d,i) => {
            return d;
        }).attr('width',(d,i) => {
            return this.width;
        })
        updatet.attr('x',(d ,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return 400 - this.padding.bottom - d;
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
            this.renderCharts()
        }, 500)
    }

    render() {
        return ( 
            <div className = "dcharts" >
                <div className = "cylinder" id = "cylinder" / >
                <button onClick={this.addEle}>添加元素</button>
                <button onClick={this.sorts}>排序元素</button>
            </div>
        )
    }
}