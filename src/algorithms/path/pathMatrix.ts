import {Edge, Graph, Node, PathLocator} from '../..';

interface NodePath<T> {
    node: Node<T>,
    path: Edge<T>[]
    distance: number;
}

export class PathMatrix<T> implements PathLocator<T>{
    static Infinity = Number.POSITIVE_INFINITY;
    private path: {[nodeId: string]: NodePath<T>} = {};

    constructor(graph: Graph<T>, public source: Node<T>) {
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