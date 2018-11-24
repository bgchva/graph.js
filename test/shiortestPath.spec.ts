import {BellmanFord, Dijkstra, PathMatrix, Johnson} from '../src/algorithms/shortestPath';
import {Graph, Node, Edge} from '../src/lib/graph';

describe('shortest path', () => {
    const graph = new Graph<number>();
    const node1 = graph.addNode(1);
    const node2 = graph.addNode(2);
    const node3 = graph.addNode(3);
    const edge1_2 = node1.addEdge(node2, 1);
    const edge1_3 = node1.addEdge(node3, 5);
    const edge2_3 = node2.addEdge(node3, 3);

    function checkPathAndDistance<T>(matrix: PathMatrix<T>, node: Node<T>,
                                     expectedDistance: number,
                                     expectedPath: Edge<T>[]) {

        const actualDistance = matrix.getDistance(node);
        expect(actualDistance).toEqual(expectedDistance);

        const actualPath = matrix.getPath(node);
        expect(actualPath).toEqual(expectedPath);
    }

    describe('Dijkstra', () => {
        it('should calculate shortest path from node1 to node2', () => {
            const d = new Dijkstra(graph, node1);
            checkPathAndDistance(d.matrix, node2, 1, [edge1_2]);
        });

        it('should calculate shortest path from node1 to node3', () => {
            const d = new Dijkstra(graph, node1);
            checkPathAndDistance(d.matrix, node3, 4, [edge1_2, edge2_3]);
        });

        it('shouldn\'t find path from node3 to node1', () => {
            const d = new Dijkstra(graph, node3);
            checkPathAndDistance(d.matrix, node1, PathMatrix.Infinity, []);
        });
    });

    describe('BellmanFord', () => {
        it('should calculate shortest path from node1 to node2', () => {
            const d = new BellmanFord(graph, node1);
            checkPathAndDistance(d.matrix, node2, 1, [edge1_2]);
        });

        it('should calculate shortest path from node1 to node3', () => {
            const d = new BellmanFord(graph, node1);
            checkPathAndDistance(d.matrix, node3, 4, [edge1_2, edge2_3]);
        });

        it('shouldn\'t find path from node3 to node1', () => {
            const d = new BellmanFord(graph, node3);
            checkPathAndDistance(d.matrix, node1, PathMatrix.Infinity, []);
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
                const matrix = new BellmanFord(graph, node6).matrix;
                expect(matrix.getDistance(node10)).toEqual(PathMatrix.Infinity);
            });

            it('should find negative distance', () => {
                const node1 = graph.getNode(1);
                const node9 = graph.getNode(9);
                const matrix = new BellmanFord(graph, node1).matrix;
                expect(matrix.getDistance(node9)).toEqual(-1);
            });

            it('should find negative distance', () => {
                const node1 = graph.getNode(1);
                const node6 = graph.getNode(6);
                const matrix = new BellmanFord(graph, node1).matrix;
                expect(matrix.getDistance(node6)).toEqual(-4);
            });

            it('should detect cycle', () => {
                const node1 = graph.getNode(1);
                const node6 = graph.getNode(6);
                node6.addEdge(node1, -1);
                const getMatrix = () => new BellmanFord(graph, node1).matrix;
                expect(getMatrix).toThrowError();
            })
        });
    });

    xdescribe('Johnson', () => {
        //TODO: Johnson algorithm test
        it('', () => {
            const t = new Johnson(graph).matrix;
        });
    })
});
