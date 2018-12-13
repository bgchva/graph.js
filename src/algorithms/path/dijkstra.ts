import {Graph, Node} from '../..';
import {MinPriorityQueue} from '../minPriorityQueue';
import {ShortestPathAlgorithm} from './shortestPath';
import {PathMatrix} from './pathMatrix';

export class DijkstraAlgorithm<T> implements ShortestPathAlgorithm<T> {
    createMatrix(graph: Graph<T>, source: Node<T>): PathMatrix<T> {
        const priorityQueue = new MinPriorityQueue<Node<T>>();
        const matrix = new PathMatrix(graph, source);

        const nodes = graph.getAllNodes();
        nodes.forEach((node, index) => {
            priorityQueue.push(node, index);
        });

        while (priorityQueue.size() != 0) {
            const node = priorityQueue.pop();

            node.getAllEdges().forEach(edge => {
                const dist = matrix.updatePath(edge);
                if(dist != null) {
                    priorityQueue.remove(node);
                    priorityQueue.push(node, dist);
                }
            });
        }
        return matrix;
    }
}