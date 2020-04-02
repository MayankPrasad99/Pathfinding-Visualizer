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
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = createGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        const newGrid = getGridWithWall(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }
    
    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getGridWithWall(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }
    
    handleMouseUp() {
        this.setState({mouseIsPressed: false});
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
        const {grid, mouseIsPressed} = this.state;
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
                            const {col, row, isFinish, isStart, isWall} = node;
                            return (
                                <Node
                                key = {nodeIdx}
                                col = {col}
                                row = {row}
                                isFinish = {isFinish}
                                isStart = {isStart}
                                isWall={isWall}
                                mouseIsPressed={mouseIsPressed}
                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                onMouseUp={() => this.handleMouseUp()}></Node>
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
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === END_NODE_ROW && col === END_NODE_COL,
        isWall: false,
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

const getGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
  

export default PathfindingVisualizer


