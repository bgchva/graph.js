graph.js
========

A liteweight javascript graph algorithms library. 

Algorithms implemented so far 
----------
* BFS/DFS
* Dijkstra for shortest path
* Bellman- Ford for shortest path ( Negative Cycle checking )
* Johnson's for all pair shortest paths
* Prim's Algorithm for minimum spanning tree of Undirected complete graph
 
To do Algorithms
----------------

* Kruskal
* Max Flow
* Centrality
* A * Search
* DAG shortest path
* Connected Components


How to use
----------
* Sample code can be found in **test** folder

Initialization
--------------

    const graph = new Graph<string>();    // creates a graph
    const node1 = graph.addNode("India"); // creates a node
    const node2 = graph.addNode("Delhi"); // creates a node
    node1.addEdge(node2);                 // Adds an edge between node1 & node2
    console.log(node1.getEdges());        // returns all neighbouring nodes of nod1
    console.log(node2.getEdges());        // returns all neighbouring nodes of nod2
    console.log(graph.getAllNodes().length); // returns number of nodes in graph
    
Traversal
---------

    const bfsTraversedNodes = Bfs(graph).get(); // returns a bfs traversal of graph
    const dfsTraversedNodes = Dfs(graph).get(); // returns a dfs traversal of graph
    
Shortest Distance between two nodes
------------------------------

    const matrix = new Dijkstra(graph, sourceNode).matrix;  //create matrix
    matrix.getDistance(destinationNode); // returns shortest distance between source and destination nodes
    matrix.getPath(destinationNode);     // returns shortest path between source and destination nodes

    const matrix = BellmanFord(graph, node1).matrix; // This function returns null if there exist negative cycle in the graph otherwise it gives the shortest distance between nodes
    matrix.getDistance(node6); // returns shortest distance between source and destination nodes
    matrix.getPath(node6);     // returns shortest path between source and destination nodes
