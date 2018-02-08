/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-08 14:48:13
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
export default class PieDcharts extends Component {
    constructor(props) {
        super(props);
        this.colors = d3.schemeCategory20;
        this.data =  [{name:'chrome',value:0.1},{name:'firefox',value:0.2},{name:'ie',value:0.3},{name:'360',value:0.25},{name:'sougou',value:0.15},];
        this.padding = {left:40,right:20,top:20,bottom:20};
        this.width = 0;
        this.height = 0;
    }

    renderCharts() {
        this.width = parseInt(d3.select("#pie").style('width'));
        this.height = parseInt(d3.select("#pie").style('height'));
        let ele = d3.select("#pie").append('svg').style('width','100%').style('height','100%');
        let data = this.transformData(this.data);
        this.drawPie(ele,data);
    }
    
    updateCharts(){
        let ele = d3.select("#pie").select('svg');
        
    }
    

    drawPie(ele,data){
       let arcs = d3.arc().innerRadius(0)
       .outerRadius(100);
        let g = ele.selectAll('g').data(data).enter().append('g').attr('transform','translate(' + (this.width / 2)  + ', ' + (this.height / 2) + ')');
        g.append('path').attr('fill',(d,i) => {
            return this.colors[i];
        }).attr('d',function(d,i){
            return arcs(d);
        })
        this.drawText(g,data,arcs);
        this.drawLine(g,data,arcs);
        this.drawOuterText(g,data,arcs);
    }

    drawText(ele,data,arc){
        let  t = ele.selectAll('text').data(data).enter().append('text').attr('transform',d => {
            let x = arc.centroid(d)[0] ;
            let y = arc.centroid(d)[1] ;
            return "translate(" + x + "," + y + ")";
        });
        t.attr('text-anchor','middle').text(d => {
            return (d.value * 100).toFixed(0) + '%';
        }).style('color','white')
    }

    drawLine(ele,data,arc){
        let l = ele.selectAll('line').data(data).enter().append('line');
        l.attr('x1',d => {
            let x = arc.centroid(d)[0] * 2;
            return x;
        }).attr('y1',d => {
            let y = arc.centroid(d)[1] * 2;
            return y;
        }).attr('x2',d => {
            let x = arc.centroid(d)[0] * 2.2;
            return x;
        }).attr('y2',d => {
            let y = arc.centroid(d)[1] * 2.2;
            return y;
        }).attr('stroke','black')
    }

    drawOuterText(ele,data,arc){
        let  t = ele.append('text').attr('transform',d => {
            let x = arc.centroid(d)[0] * 2.5 ;
            let y = arc.centroid(d)[1] * 2.5 ;
            return "translate(" + x + "," + y + ")";
        });
        t.attr('text-anchor','middle').text(d => {
            return d.data.name;
        }).attr('color','white')
    }

    transformData(data){
        let td = d3.pie().value(row => {
            return row.value;
        })(data)
        return td;
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderCharts();
        }, 500)
    }

    render() {
        return ( 
            <div className="pie">
                <div className = "charts" id = "pie" />
            </div>
        )
    }
}