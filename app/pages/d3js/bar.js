/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-23 16:23:40
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
export default class BarDcharts extends Component {
    constructor(props) {
        super(props)
        this.data = [45,67,83,23,78,12,50];
        this.stepWidth = 45;
        this.width = 40;
        this.height = 300;
        this.padding = {left:40,right:20,top:20,bottom:20};
        this.addEle = this.addEle.bind(this);
        this.sorts = this.sorts.bind(this);    
        this.st = true;
    }

    renderCharts() {
        let ele = d3.select('body').select('#charts').append('svg').attr('width','100%').attr('height','100%');
        let max = d3.max(this.data);
        let maxs = this.height - this.padding.top;
        //绘制坐标
        let y = d3.scaleLinear().domain([0, max*1.1]).range([maxs,this.padding.bottom]);//线性比例尺
        let axis  = d3.axisLeft().scale(y);//创建坐标
        //画矩形
        this.drawBar(ele,y);
        //画文本
        this.drawText(ele,y);
        //画坐标轴
        let w = this.padding.left;
        ele.append('g').attr('transform','translate(' + w + ',' + 0 + ')').call(axis);
    }

    drawBar(ele,y){
        let update = ele.selectAll('rect').data(this.data); 
        let enter = update.enter();
        let exit = update.exit();

        //待添加
        enter.append('rect').attr('fill','blue').attr('x',(d ,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return y(d);
        }).attr('height',(d,i) => {
            return this.height - this.padding.bottom - y(d);
        }).attr('width',(d,i) => {
            return this.width;
        }).on('click',function(d,i){
            // d3.select(this).attr('fill','yellow');
        }).on('mouseover',function(d,i){
            d3.select(this).attr('fill','green');
        }).on('mouseout',function(d,i){
            d3.select(this).attr('fill','red');
        }).on('mousemove',function(d,i){
            d3.select(this).attr('fill','pink');
        }).on('mouseup',function(d,i){
            d3.select(this).attr('fill','purple');
        }).on('mousedown',function(d,i){
            d3.select(this).attr('fill','black');
        })
         //待更新
         update.attr('x',(d ,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return y(d);
        }).attr('height',(d,i) => {
            return this.height - this.padding.bottom - y(d);
        }).attr('width',(d,i) => {
            return this.width;
        })
        //待移除
        exit.remove();

        d3.select('body').on('keyup',function(){
            update.attr('fill','#fefefe')
        }).on('keypress',function(){
            update.attr('fill','#dedede')
        }).on('keydown',function(){
            update.attr('fill','#cdcdcd')
        })
    }

    drawText(ele,y){
        let update = ele.selectAll('text').data(this.data); 
        let enter = update.enter();
        let exit = update.exit();
        exit.remove();
        
        enter.append('text').attr('font-size','14px').attr('text-anchor','middle').attr('x',(d,i) => {
            return this.padding.left + i * this.stepWidth;
        }).attr('y',(d,i) => {
            return y(d);
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
            return y(d);
        }).attr('dx',(d,i) => {
            return this.width / 2;
        }).attr('dy',(d,i)=>{
            return '1em';
        }).text((d,i) => {
            return d;
        })
    }

    updateCharts(){
        let ele = d3.select('body').select('#charts').select('svg');
        let max = d3.max(this.data);
        let maxs = this.height - this.padding.top;
        //绘制坐标
        let y = d3.scaleLinear().domain([0, max*1.1]).range([maxs,this.padding.bottom]);//线性比例尺
        let axis  = d3.axisLeft().scale(y);//创建坐标

        this.drawBar(ele,y);
        this.drawText(ele,y);
        //更新坐标轴
        console.log(axis);
        ele.select('g').call(axis);
       
    }
    //添加元素
    addEle(){
        let n = Math.random() * 150;
        this.data.push(n.toFixed(0));
        this.updateCharts();
    }
    //排序
    sorts(){
        this.st = !this.st;
        this.data.sort(this.st ? d3.ascending : d3.descending);
        this.updateCharts();
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderCharts();
        }, 500)
    }

    render() {
        return ( 
            <div className="bar">
                <div className = "charts" id = "charts" />
                <button onClick={this.addEle}>添加元素</button>
                <button onClick={this.sorts}>排序元素</button>
            </div>
        )
    }
}