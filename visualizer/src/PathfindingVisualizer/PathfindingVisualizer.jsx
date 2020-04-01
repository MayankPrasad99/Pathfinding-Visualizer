import React, { Component } from 'react'
import Node from './Node/Node'
import './PathfindingVisualizer.css'

export class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        const grid = createGrid();
        this.setState({grid});
    }

    render() {
        const {grid} = this.state;
        console.log(grid);

        return (
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const {col, row, isFinish, isStart} = node;
                            return (
                                <Node
                                key = {nodeIdx}
                                col = {col}
                                row = {row}
                                isFinish = {isFinish}
                                isStart = {isStart}></Node>
                            );
                        })}
                        </div>
                    );
                })}              
            </div>
        );       
    }
}

const createGrid = () => {
    const grid = [];
    for(let row = 0; row < 20; row++){
        const currentRow = [];
        for(let col = 0; col < 50; col++){
            currentRow.push(createNode(row,col));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (row,col) => {
    return {
        col,
        row,
        isStart: row === 7 && col === 7,
        isFinish: row === 12 && col === 39,
    };
};

export default PathfindingVisualizer
