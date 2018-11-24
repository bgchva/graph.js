import {BinaryHeap} from './binaryHeap';

class MinPQNode<T> {
    constructor(public content: T, public priority: number) { }
}

export class MinPriorityQueue<T> {
    private heap: BinaryHeap<MinPQNode<T>>;

    constructor() {
        this.heap = new BinaryHeap<MinPQNode<T>>();
    }

    size(): number {
        return this.heap.size();
    }

    push(node: T, priority: number): void {
        const temp = new MinPQNode(node, priority);
        this.heap.insertPush(temp);
    }

    pop(): T {
        return this.size() ? this.heap.removePop().content : null;
    }

    top(): T {
        return this.size() ? this.heap.top().content : null;
    }

    remove(node: T): boolean {
        const pNode = this.heap.getNodes().find(n => n.content === node);
        if(!pNode)
            return false;

        this.heap.deleteNode(pNode);
        return true;
    }
}