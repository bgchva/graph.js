import {Algorithm, ShortestPath, ShortestPathAlgorithm, ShortestPathAlgorithmFactory} from '../src';
import {Graph, Node, Edge} from '../src';
import {PathMatrix} from '../src/algorithms/path/pathMatrix';

describe('shortest path', () => {
    const graph = new Graph<number>();
    const node1 = graph.addNode(1);
    const node2 = graph.addNode(2);
    const node3 = graph.addNode(3);
    const edge1_2 = node1.addEdge(node2, 1);
    const edge1_3 = node1.addEdge(node3, 5);
    const edge2_3 = node2.addEdge(node3, 3);

    function checkPathAndDistance<T>(shortestPath: ShortestPath<T>,
                                     source: Node<T>,
                                     target: Node<T>,
                                     expectedDistance: number,
                                     expectedPath: Edge<T>[]) {
        const actualDistance = shortestPath.getPathLength(source, target);
        expect(actualDistance).toEqual(expectedDistance);

        const actualPath = shortestPath.getPath(source, target);
        expect(actualPath).toEqual(expectedPath);
    }

    describe('Dijkstra', () => {
        let alg: ShortestPathAlgorithm<number>;
        beforeAll(() => {
            alg = ShortestPathAlgorithmFactory.get<number>(Algorithm.Dijkstra);
        });

        it('should calculate shortest path from node1 to node2', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node1, node2, 1, [edge1_2]);
        });

        it('should calculate shortest path from node1 to node3', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node1, node3, 4, [edge1_2, edge2_3]);
        });

        it('shouldn\'t find path from node3 to node1', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node3, node1, PathMatrix.Infinity, []);
        });
    });

    describe('BellmanFord', () => {
        let alg: ShortestPathAlgorithm<number>;
        beforeAll(() => {
            alg = ShortestPathAlgorithmFactory.get<number>(Algorithm.BellmanFord);
        });

        it('should calculate shortest path from node1 to node2', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node1, node2, 1, [edge1_2]);
        });

        it('should calculate shortest path from node1 to node3', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node1, node3, 4, [edge1_2, edge2_3]);
        });

        it('shouldn\'t find path from node3 to node1', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node3, node1, PathMatrix.Infinity, []);
        });

        describe('negative edges', () => {
            let graph: Graph<number>;
            beforeAll(() => {
                graph = new Graph<number>();
                const node1 = graph.addNode(1);
                const node2 = graph.addNode(2);
                const node3 = graph.addNode(3);
                const node4 = graph.addNode(4);
                const node5 = graph.addNode(5);
                const node6 = graph.addNode(6);
                const node7 = graph.addNode(7);
                const node8 = graph.addNode(8);
                const node9 = graph.addNode(9);
                const node10 = graph.addNode(10);
                node1.addEdge(node2, 1);
                node1.addEdge(node4, 1);
                node2.addEdge(node3, -1);
                node4.addEdge(node5, -4);
                node3.addEdge(node6, -2);
                node3.addEdge(node7, -2);
                node5.addEdge(node6, -1);
                node6.addEdge(node7, -1);
                node7.addEdge(node8, -3);
                node6.addEdge(node9, 3);
            });

            it('shouldn\'t find path if nodes are not connected', () => {
                const node6 = graph.getNode(6);
                const node10 = graph.getNode(10);

                const shortestPath = new ShortestPath(graph, alg);
                const actualPathLength = shortestPath.getPathLength(node6, node10);
                expect(actualPathLength).toEqual(PathMatrix.Infinity);
            });

            it('should find negative distance', () => {
                const node1 = graph.getNode(1);
                const node9 = graph.getNode(9);

                const shortestPath = new ShortestPath(graph, alg);
                const actualPathLength = shortestPath.getPathLength(node1, node9);
                expect(actualPathLength).toEqual(-1);
            });

            it('should find negative distance', () => {
                const node1 = graph.getNode(1);
                const node6 = graph.getNode(6);

                const shortestPath = new ShortestPath(graph, alg);
                const actualPathLength = shortestPath.getPathLength(node1, node6);
                expect(actualPathLength).toEqual(-4);
            });

            it('should detect cycle', () => {
                const node1 = graph.getNode(1);
                const node6 = graph.getNode(6);
                node6.addEdge(node1, -1);

                const shortestPath = new ShortestPath(graph, alg);
                const getActualPathLength = () => shortestPath.getPathLength(node1, node6);
                expect(getActualPathLength).toThrowError();
            })
        });
    });

    describe('Johnson', () => {
        let alg: ShortestPathAlgorithm<number>;
        beforeAll(() => {
            alg = ShortestPathAlgorithmFactory.get<number>(Algorithm.Johnson);
        });

        it('should calculate shortest path from node1 to node2', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node1, node2, 1, [edge1_2]);
        });

        it('should calculate shortest path from node1 to node3', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node1, node3, 4, [edge1_2, edge2_3]);
        });

        it('shouldn\'t find path from node3 to node1', () => {
            const shortestPath = new ShortestPath(graph, alg);
            checkPathAndDistance(shortestPath, node3, node1, PathMatrix.Infinity, []);
        });

        //TODO: test with negative edges
    })
});
