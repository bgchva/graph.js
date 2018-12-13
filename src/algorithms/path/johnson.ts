import {Graph, Node, ShortestPathAlgorithm} from '../..';
import {PathMatrix} from './pathMatrix';
import {DijkstraAlgorithm} from './dijkstra';
import {BellmanFordAlgorithm} from './bellmanFord';

//http://en.wikipedia.org/wiki/Johnson%27s_algorithm
export class JohnsonAlgorithm<T> implements ShortestPathAlgorithm<T> {
    createMatrix(graph: Graph<T>, source: Node<T>): PathMatrix<T> {
        const belDistanceMatrix = this.createBellManMatrix(graph);

        const nodes = graph.getAllNodes();
        nodes.forEach(node => {
            node.getAllEdges().forEach(e => {
                e.weight = e.weight + belDistanceMatrix.getDistance(node) - belDistanceMatrix.getDistance(e.nodeTo);
            });
        });

        const matrix = new DijkstraAlgorithm<T>().createMatrix(graph, source);

        nodes.forEach(node => {
            node.getAllEdges().forEach(e => {
                e.weight = e.weight - belDistanceMatrix.getDistance(node) + belDistanceMatrix.getDistance(e.nodeTo);
            });
        });
        return matrix;
    }

    private createBellManMatrix(graph) {
        const temp: any = new Node(null);
        const tempNode = graph.addNode(temp);
        const nodes = graph.getAllNodes();
        nodes.forEach(node => {
            tempNode.addEdge(node, 0);
        });

        const belDistanceMatrix = new BellmanFordAlgorithm<T>().createMatrix(graph, tempNode);
        graph.removeNode(temp);
        return belDistanceMatrix;
    }
}