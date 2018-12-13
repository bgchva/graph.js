import * as uuid from 'uuid/v4'

export class Graph<T> {
    private nodes: Node<T>[] = [];

    getAllNodes() {
        return this.nodes;
    }

    getNode(data: T): Node<T> {
        return this.nodes.find(n => n.data === data);
    }

    getNodeById(id: string): Node<T> {
        return this.nodes.find(n => n.id === id);
    }

    nodeExist(data: T): boolean {
        return !!this.getNode(data);
    }

    addNode(data: T): Node<T> {
        const newNode = new Node<T>(data);
        this.nodes.push(newNode);
        return newNode;
    }

    removeNode(data: T): Node<T> {
        const removingNode = this.getNode(data);
        if (!removingNode)
            return;

        for (let node of this.nodes) {
            node.removeEdge(removingNode);
        }
        const index = this.nodes.indexOf(removingNode);
        this.nodes.splice(index, 1);
        return removingNode;
    }
}

export interface Edge<T> {
    nodeFrom?: Node<T>;
    nodeTo: Node<T>;
    weight?: number;
}

export class Node<T> {
    readonly id: string;
    readonly data: T;
    private edges: Edge<T>[];

    constructor(data: T) {
        this.id = uuid();
        this.data = data;
        this.edges = [];
    }

    addEdge(nodeTo: Node<T>, weight?: number): Edge<T>
    addEdge(edge: Edge<T>): Edge<T>
    addEdge(nodeToOrEdge: Edge<T> | Node<T>, weight?: number): Edge<T> {
        const edge: Edge<T> = {
            nodeTo: null,
            nodeFrom: this,
            weight: 1
        };
        if(nodeToOrEdge instanceof Node) {
            edge.nodeTo = nodeToOrEdge;
            if(weight !== undefined)
                edge.weight = weight;
        }
        else
            Object.assign(edge, nodeToOrEdge);

        this.edges.push(edge);
        return edge;
    }

    removeEdge(edge: Node<T>) {
        const index = this.edges.findIndex(e => e.nodeTo === edge);
        if (index == -1)
            return;

        this.edges.slice(index, 1);
    }

    getAllEdges(): Edge<T>[] {
        return this.edges;
    }
}