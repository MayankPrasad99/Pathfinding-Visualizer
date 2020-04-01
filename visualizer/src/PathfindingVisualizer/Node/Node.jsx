import React, { Component } from 'react'
import './Node.css'

export class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            col,
            row,
            isFinish,
            isStart,
        } = this.props;
        const NodeClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';

        return(
            <div 
            id={`node-${row}-${col}`}
            className={`node ${NodeClassName}`}></div>
        )
    }
}

export default Node
