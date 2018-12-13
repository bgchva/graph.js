import {Edge, Graph, Node} from '../..';
import {DijkstraAlgorithm} from './dijkstra';
import {BellmanFordAlgorithm} from './bellmanFord';
import {JohnsonAlgorithm} from './johnson';

export interface PathLocator<T> {
    getDistance(node: Node<T>): number;
    getPath(node: Node<T>): Edge<T>[];
}

export interface ShortestPathAlgorithm<T> {
    createMatrix(graph: Graph<T>, source: Node<T>): PathLocator<T>
}

export class ShortestPath<T> {
    private matrix: {[sorceNodeId: string]: PathLocator<T>} = {};

    constructor(private graph: Graph<T>, public alg: ShortestPathAlgorithm<T>) { }

    getPath(source: Node<T>, target: Node<T>): Edge<T>[] {
        const matrix = this.getMatrix(source);
        return matrix.getPath(target);
    }

    getPathLength(source: Node<T>, target: Node<T>): number {
        const matrix = this.getMatrix(source);
        return matrix.getDistance(target);
    }

    private getMatrix(source: Node<T>): PathLocator<T> {
        if(!this.matrix[source.id])
            this.matrix[source.id] = this.createMatrix(source);
        return this.matrix[source.id];
    }

    private createMatrix(source: Node<T>): PathLocator<T> {
        return this.alg.createMatrix(this.graph, source);
    }
}

export enum Algorithm {
    Dijkstra,
    BellmanFord,
    Johnson
}

export class ShortestPathAlgorithmFactory {
    static get<T>(algorithm: Algorithm): ShortestPathAlgorithm<T> {
        switch(algorithm) {
            case Algorithm.Dijkstra:
                return new DijkstraAlgorithm<T>();
            case Algorithm.BellmanFord:
                return new BellmanFordAlgorithm<T>();
            case Algorithm.Johnson:
                return new JohnsonAlgorithm<T>();
        }
    }
}