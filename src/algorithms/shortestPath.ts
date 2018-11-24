import {Node, Graph, Edge} from '../lib/graph';
import {MinPriorityQueue} from './minPriorityQueue';

interface NodePath<T> {
    node: Node<T>,
    path: Edge<T>[]
    distance: number;
}

export class PathMatrix<T> {
    static Infinity = Number.POSITIVE_INFINITY;
    private path: {[nodeId: string]: NodePath<T>} = {};

    constructor(graph: Graph<T>, source: Node<T>) {
        const nodes = graph.getAllNodes();
        nodes.forEach(node => {
            this.setPath({node: node, path: [], distance: PathMatrix.Infinity});
        });
        this.setPath({node: source, path: [], distance: 0});
    }

    getDistance(node: Node<T>): number {
        return this.path[node.id].distance;
    }

    getPath(node: Node<T>): Edge<T>[] {
        return this.path[node.id].path;
    }

    updatePath(edge: Edge<T>): number | null {
        if (this.getDistance(edge.nodeFrom) != PathMatrix.Infinity) {
            const alt = this.getDistance(edge.nodeFrom) + edge.weight;
            if (alt < this.getDistance(edge.nodeTo)) {
                const path = [...this.getPath(edge.nodeFrom), edge];
                this.setPath({node: edge.nodeTo, path: path, distance: alt});
                return alt;
            }
        }
        return null;
    }

    private setPath(nodePath: NodePath<T>) {
        this.path[nodePath.node.id] = nodePath;
    }
}

export class Dijkstra<T> {
    readonly matrix: PathMatrix<T>;
    private priorityQueue: MinPriorityQueue<Node<T>>;

    constructor(private graph: Graph<T>, source: Node<T>) {
        this.priorityQueue = new MinPriorityQueue<Node<T>>();
        this.matrix = this.createMatrix(source);
    }

    private createMatrix(source: Node<T>): PathMatrix<T> {
        const matrix = new PathMatrix(this.graph, source);

        const nodes = this.graph.getAllNodes();
        nodes.forEach((node, index) => {
            this.priorityQueue.push(node, index);
        });

        while (this.priorityQueue.size() != 0) {
            const node = this.priorityQueue.pop();

            node.getAllEdges().forEach(edge => {
                const dist = matrix.updatePath(edge);
                if(dist != null) {
                    this.priorityQueue.remove(node);
                    this.priorityQueue.push(node, dist);
                }
            });
        }
        return matrix;
    }
}

export class BellmanFord<T> {
    readonly matrix: PathMatrix<T>;

    constructor(private graph: Graph<T>, source: Node<T>) {
        this.matrix = this.createMatrix(source);
    }

    private createMatrix(source: Node<T>): PathMatrix<T> {
        const nodes = this.graph.getAllNodes();
        const matrix = new PathMatrix(this.graph, source);

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
                if(d != null)
                    throw new Error("Graph contains a negative-weight cycle");
            });
        });
        return matrix;
    }
}

//http://en.wikipedia.org/wiki/Johnson%27s_algorithm
export class Johnson<T> {
    readonly matrix;

    constructor(private graph: Graph<T>) {
        this.matrix = this.createMatrix();
    }

    private createMatrix() {
        const belDistanceMatrix = this.createBellManMatrix();

        const nodes = this.graph.getAllNodes();
        const matrix = {};
        nodes.forEach(node => {
            node.getAllEdges().forEach(e => {
                e.weight = e.weight + belDistanceMatrix.getDistance(node) - belDistanceMatrix.getDistance(e.nodeTo);
            });
        });

        nodes.forEach(node => {
            const dij = new Dijkstra(this.graph, node);
            matrix[node.id] = dij.matrix;
        });

        nodes.forEach(node => {
            node.getAllEdges().forEach(e => {
                e.weight = e.weight - belDistanceMatrix.getDistance(node) + belDistanceMatrix.getDistance(e.nodeTo);
            });
        });
        return matrix;
    }

    private createBellManMatrix() {
        const temp: any = new Node(null);
        const tempNode = this.graph.addNode(temp);
        const nodes = this.graph.getAllNodes();
        nodes.forEach(node => {
            tempNode.addEdge(node, 0);
        });

        const belDistanceMatrix = new BellmanFord(this.graph, tempNode).matrix;
        this.graph.removeNode(temp);
        return belDistanceMatrix;
    }
}