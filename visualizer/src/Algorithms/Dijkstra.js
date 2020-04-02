export function dijkstra(grid, startNode, endNode, edges){
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            node.distance = Infinity;
            node.visited = false;
            node.previousNode = startNode;
            nodes.push(node);
        }
    }
    const  visitedNodesInOrder = [];
    startNode.distance = 0;
    for(let k = 0;k < nodes.length ;k++){
        const [minNode,minIdx] = getMin(nodes);
        minNode.visited= true;
        visitedNodesInOrder.push(minNode);
        if(minNode === endNode){
            return visitedNodesInOrder;
        }
        for(let j = 0; j < nodes.length; j++){
            const node = nodes[j];
            if(edges[minIdx][j] !== 0){
                if(!node.visited && (node.distance > minNode.distance + edges[minIdx][j])){
                    node.distance = minNode.distance + edges[minIdx][j];
                    node.previousNode = minNode;
                }
            }
        }
    }

}


export function getShortestPathNodes(startNode,endNode) {
    const visitedNodes = [];
    let currentNode = endNode;
    while(currentNode !== startNode){
        visitedNodes.push(currentNode);
        currentNode = currentNode.previousNode;
    }
    visitedNodes.push(currentNode);
    return visitedNodes;
}


function getMin(nodes){
    let minNode = undefined;
    let minIdx = -1;
    let i = 0;
    for(const node of nodes){
        if(!node.visited && (minNode === undefined || minNode.distance > node.distance)){
            minNode = node;
            minIdx = i;
        }
        i++;
    }
    return [minNode,minIdx];
}

// export function dijkstra(grid,startNode,endNode,row,col,edges){
//     const startRow = startNode.row;
//     const startCol = startNode.col;
//     const endRow = endNode.col;
//     const endCol = endNode.col;
//     const visited = [];
//     const distance = [];
//     const nodeOrder = [];
//     for(let i=0;i<row*col;i++){
//         visited[i] = false;
//         distance[i] = Infinity;
//     }
//     distance[startRow*row + startCol] = 0;
//     for(let i=0;i<row*col;i++){
//         const minVertex;
//         if (i === 0){
//             minVertex = startRow*row + startCol;
//         }else{
//             minVertex = getmin(visited,n,distance);
//         }
//         visited[minVertex] = true;
//         for(let j=0;j<row*col;j++){
//             if(edges[minVertex][j] != 0){
//                 if(!visited[j] && (distance[j] > distance[minVertex] + edges[minVertex][j])){
//                     distance[j] = distance[minVertex] + edges[minVertex][j];
//                 }
//             }
//         }
//     }
// }

// function getMin(visited,row,col,grid){
//     let minVertex = -1;
//     for(let i=0;i<row*col;i++){
//         if(!visited[i] && (minVertex == -1 || distance[minVertex] > distance[i])){
//             minVertex = i;
//         }
//     }
//     return minVertex;
// }


// function makeEdges(grid,row,col) {
//     const edges = [];
//     for(let i = 0; i < row*col; i++) {
//         edges[i] = [];
//         for(let j = 0; j < row*col; j++) {
//             edges[i][j] = 0;
//         }
//     }
//     const tempRow = 0;
//     const tempCol = 0;
//     for(let i=0;i<row*col;i++){
//         if(tempRow*row + tempCol + 1 < col){
//             edges[i][tempRow*row + tempCol + 1] = 1;
//         }
//         if(tempRow*row + tempCol - 1 >= 0){
//             edges[i][tempRow*row + tempCol - 1] = 1;
//         }
//         if((tempRow+1)*row + tempCol < row){
//             edges[i][(tempRow+1)*row + tempCol] = 1;            
//         }
//         if((tempRow-1)*row + tempCol >= 0){
//             edges[i][(tempRow-1)*row + tempCol] = 1;    
//         }
//         tempCol += 1;
//         if(tempCol >= col){
//             tempCol = 0;
//             tempRow += 1;
//         }
//     }
//     return edges;
// }






















// #include <bits/stdc++.h>
// using namespace std;

// int getmin(bool* visited,int n,int* distance){
//     int minVertex = -1;
//     for(int i=0;i<n;i++){
//         if(!visited[i] && (minVertex == -1 || distance[minVertex] > distance[i])){
//             minVertex = i;
//         }
//     }
//     return minVertex;
// }
// void dijkstra(int n,int** edges){
//     bool* visited = new bool[n];
//     int* distance = new int[n];
//     for(int i=0;i<n;i++){
//         distance[i] = INT_MAX;
//         visited[i] = false;
//     }
//     distance[0] = 0;
    // for(int i=0;i<n;i++){
    //     int minVertex = getmin(visited,n,distance);
    //     visited[minVertex] = true;
    //     for(int j=0;j<n;j++){
    //         if(edges[minVertex][j] != 0){
    //             if(!visited[j] && (distance[j] > distance[minVertex] + edges[minVertex][j])){
    //                 distance[j] = distance[minVertex] + edges[minVertex][j];
    //             }
    //         }
    //     }
    // }
//     for(int i=0;i<n;i++){
//         cout << i << ' ' << distance[i] << endl;
//     }
// }

// int main(){
//     int n, E;
//     cin >> n >> E;
//     int** edges = new int*[n];
//     for(int i=0;i<n;i++){
//         edges[i] = new int[n];
//     }
//     for(int i=0;i<n;i++){
//         for(int j=0;j<n;j++){
//             edges[i][j] = 0;
//         }
//     }
//     for(int i=0;i<E;i++){
//         int si,ei,weight;
//         cin>>si>>ei>>weight;
//         edges[si][ei]=weight;
//         edges[ei][si]=weight;
//     }
//     dijkstra(n,edges);
    
//     return 0;
// }