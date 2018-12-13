import {Graph, Node, ShortestPathAlgorithm} from '../..';
import {PathMatrix} from './pathMatrix';

export class BellmanFordAlgorithm<T> implements ShortestPathAlgorithm<T> {
    createMatrix(graph: Graph<T>, source: Node<T>): PathMatrix<T> {
        const nodes = graph.getAllNodes();
        const matrix = new PathMatrix(graph, source);

        for (let i = 0; i < nodes.length; i++) {
            nodes.forEach(node => {
                node.getAllEdges().forEach(edge => {
                    matrix.updatePath(edge);
                });
            });
        }
        nodes.forEach(node => {
            node.getAllEdges().forEach(edge => {
                const d = matrix.updatePath(edge);
                if (d != null)
                    throw new Error("Graph contains a negative-weight cycle");
            });
        });
        return matrix;
    }
}