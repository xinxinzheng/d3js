/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-30 15:33:47
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import "./webgl.less";
import "./lib/webgl-utils.js"
import "./lib/webgl-debug.js"
import "./lib/cuon-utils.js"
import "./lib/cuon-matrix.js"
@connect(
    (state, props) => ({
        config: state.config,
    }) 
)
export default class webgl extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let sh = "void main(){\n" + "gl_Position = vec4(0.5,0.0,0.0,1.0);\n" + "gl_PointSize = 10.0;\n" + "}\n";
        let sf = "void main(){\n" + "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" + "}\n";

        let ele = document.getElementById('basic');
        let gl = getWebGLContext(ele);

        if(!gl){
            return;
        }
        if(!initShaders(gl,sh,sf)){
            return;
        }

        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS,0,1)
    }

    render() {
        return ( 
            <div className = "webgl" >
                <canvas className="webgl-ele" id="basic">
                </canvas>
            </div>
        )
    }
}