import {Graph} from '../src/lib/graph';
import {Prim} from '../src/algorithms/minSpanningTree';

describe('prim algorithm', () => {
    it('should process graph with without any node', () => {
        const graph = new Graph<string>();
        const prim = new Prim(graph);
        const result = prim.getMinimumSpanningTree();
        expect(result).toEqual([]);
    });

    it('should process graph with one node, but without edge', () => {
        const graph = new Graph<number>();
        graph.addNode(1);

        const prim = new Prim(graph);
        const result = prim.getMinimumSpanningTree();
        expect(result).toEqual([]);
    });

    it('should process graph with one node and one edge', () => {
        const graph = new Graph<number>();
        const node = graph.addNode(1);
        node.addEdge(node);

        const prim = new Prim(graph);
        const result = prim.getMinimumSpanningTree();
        expect(result).toEqual([]);
    });

    it('should process graph with two nodes and one edge', () => {
        const graph = new Graph<number>();
        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const edge = node1.addEdge(node2);

        const prim = new Prim(graph);
        const result = prim.getMinimumSpanningTree();
        expect(result).toEqual([edge]);
    });

    it('should process graph with two nodes and several edge', () => {
        const graph = new Graph<number>();
        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        node1.addEdge(node2, 2);
        node1.addEdge(node2, 5);
        const minEdge = node1.addEdge(node2, 1);

        const prim = new Prim(graph);
        const result = prim.getMinimumSpanningTree();
        expect(result).toEqual([minEdge]);
    });

    it('should throw error if graph is not connected', () => {
        const graph = new Graph<number>();
        graph.addNode(1);
        graph.addNode(2);

        const prim = new Prim(graph);
        const result = () => prim.getMinimumSpanningTree();
        expect(result).toThrowError();
    });

    it('should process complicated graph', () => {
        const graph = new Graph<number>();
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

        const edge1_2 = node1.addEdge(node2, 11);
        const edge2_1 = node2.addEdge(node1, 5);
        const edge1_4 = node1.addEdge(node4, 12);
        const edge4_1 = node4.addEdge(node1, 2);
        const edge2_3 = node2.addEdge(node3, 8);
        const edge3_2 = node3.addEdge(node2, 8);
        const edge4_3 = node4.addEdge(node3, 4);
        const edge3_4 = node3.addEdge(node4, 4);
        const edge3_5 = node3.addEdge(node5, 7);
        const edge5_3 = node5.addEdge(node3, 7);
        const edge2_6 = node2.addEdge(node6, 6);
        const edge6_2 = node6.addEdge(node2, 6);
        const edge6_7 = node6.addEdge(node7, 5);
        const edge7_6 = node7.addEdge(node6, 5);
        const edge5_8 = node5.addEdge(node8, 6);
        const edge8_5 = node8.addEdge(node5, 6);
        const edge5_9 = node5.addEdge(node9, 12);
        const edge9_5 = node9.addEdge(node5, 12);
        const edge8_10 = node8.addEdge(node10, 4);
        const edge10_8 = node10.addEdge(node8, 4);
        const edge9_10 = node9.addEdge(node10, 3);
        const edge10_9 = node10.addEdge(node9, 3);

        const prim = new Prim(graph);
        const actualEdges = prim.getMinimumSpanningTree();
        const expectedEdges = [
            edge1_2,
            edge2_6,
            edge6_7,
            edge2_3,
            edge3_4,
            edge3_5,
            edge5_8,
            edge8_10,
            edge10_9
        ];
        expectedEdges.forEach(expectedEdge => {
            expect(actualEdges).toContain(expectedEdge);
        });
    });
});