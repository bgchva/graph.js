import {Graph, Node} from "../lib/graph";

export class Bfs<T> {
    constructor(private graph: Graph<T>) { }

    get(): Node<T>[] {
        const result = [];
        const marked = {};
        const nodes = this.graph.getAllNodes();
        const traversedNodes = [nodes[0]];

        while (traversedNodes.length != 0) {
            const node = traversedNodes.shift();
            marked[node.id] = true;
            result.push(node);

            node.getAllEdges().forEach(edge => {
                if (!marked[edge.nodeTo.id]) {
                    traversedNodes.push(edge.nodeTo);
                    marked[edge.nodeTo.id] = true;
                }
            });
        }
        return result;
    }
}

export class Dfs<T> {
    constructor(private graph: Graph<T>) { }

    get(): Node<T>[] {
        const result = [];
        const marked = {};
        const nodes = this.graph.getAllNodes();
        const traversedNodes = [nodes[0]];

        while (traversedNodes.length != 0) {
            const node = traversedNodes.pop();
            marked[node.id] = true;
            result.push(node);

            node.getAllEdges().forEach(edge => {
                if (!marked[edge.nodeTo.id]) {
                    traversedNodes.push(edge.nodeTo);
                    marked[edge.nodeTo.id] = true;
                }
            });
        }
        return result;
    }
}