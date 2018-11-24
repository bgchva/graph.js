import {Graph, Node, Edge} from '../lib/graph';
import {MinPriorityQueue} from './minPriorityQueue';

//Minimum Spanning Tree
export class Prim<T> {
    private priorityQueue: MinPriorityQueue<Edge<T>>;
    private vNode: Node<T>[];
    private vEdge: Edge<T>[];

    constructor(private graph: Graph<T>) {
        this.priorityQueue = new MinPriorityQueue<Edge<T>>();
        this.vNode = [];
        this.vEdge = [];
    }

    getMinimumSpanningTree(): Edge<T>[] {
        const nodes = this.graph.getAllNodes();
        if(!nodes.length)
            return [];

        this.vNode.push(nodes[0]);
        this.insertEdgeIntoPQ(nodes[0]);

        while (this.vNode.length != nodes.length) {
            if (this.priorityQueue.size() == 0)
                throw new Error('Graph is not connected');

            while (this.priorityQueue.size() != 0) {
                const minEdge = this.priorityQueue.pop();

                if (this.vNode.indexOf(minEdge.nodeTo) == -1) {
                    this.vEdge.push(minEdge);
                    this.vNode.push(minEdge.nodeTo);
                    this.insertEdgeIntoPQ(minEdge.nodeTo);
                    break;
                }
            }
        }
        return this.vEdge;
    }

    private insertEdgeIntoPQ(node: Node<T>) {
        node.getAllEdges().forEach(e => {
            this.priorityQueue.push(e, e.weight)
        });
    }
}