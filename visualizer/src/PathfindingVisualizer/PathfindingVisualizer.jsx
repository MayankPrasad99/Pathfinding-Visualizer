import React, { Component } from 'react'
import Node from './Node/Node'
import './PathfindingVisualizer.css'
import {dijkstra,getShortestPathNodes} from '../Algorithms/Dijkstra'

const START_NODE_ROW = 7;
const START_NODE_COL = 7;
const END_NODE_ROW = 12;
const END_NODE_COL = 39;

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

    animateDijkstra(visitedNodes, nodesInShortestPath) {
        for (let i = 0; i <= visitedNodes.length; i++) {
          if (i === visitedNodes.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPath);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodes[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }
    
    animateShortestPath(nodesInShortestPath) {
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            setTimeout(() => {
            const node = nodesInShortestPath[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 50 * i);
        }
    }
    
    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[END_NODE_ROW][END_NODE_COL];
        const edges = makeEdges(grid);
        const visitedNodes = dijkstra(grid, startNode, endNode, edges);
        const nodesInShortestPath = getShortestPathNodes(startNode,endNode);
        this.animateDijkstra(visitedNodes, nodesInShortestPath);
    }
    
    render() {
        const {grid} = this.state;
        return (
            <>
            <button onClick={() => this.visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
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
            </>
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

function makeEdges(grid) {
    const row = grid.length;
    const col = grid[0].length;
    const edges = [];
    let totalNodes = row*col;
    for(let i=0;i<row*col;i++){
        edges[i] = [];
        for(let j=0;j<row*col;j++){
            edges[i][j] = 0;
        }
    }
    let tempRow = 0;
    let tempCol = 0;
    for(let i=0;i<totalNodes;i++){
        if(tempCol + 1 < col){
            edges[i][tempRow*col + tempCol + 1] = 1;
        }
        if(tempCol - 1 >= 0){
            edges[i][tempRow*col + tempCol - 1] = 1;
        }
        if(tempRow + 1 < row){
            edges[i][(tempRow+1)*col + tempCol] = 1;            
        }
        if(tempRow - 1 >= 0){
            edges[i][(tempRow-1)*col + tempCol] = 1;    
        }
        tempCol += 1;
        if(tempCol >= col){
            tempCol = 0;
            tempRow += 1;
        }
    }
    return edges;
}


export default PathfindingVisualizer
