interface PriorityNode {
    priority: number;
}

export class BinaryHeap<T extends PriorityNode> {
    private nodes: T[] = [];

    size(): number {
        return this.nodes.length;
    }

    top(): T {
        return this.nodes[0];
    }

    getNodes(): T[] {
        return this.nodes;
    }

    insertPush(element: T): void {
        this.nodes.push(element);
        this.bubbleUp(this.nodes.length - 1);
    };

    removePop(): T | null {
        const top = this.top();
        if (this.nodes.length > 0) {
            this.nodes.shift();
            this.sinkDown(0);
        }
        return top || null;
    };

    deleteNode(node: T): void {
        const length = this.size();
        const i = this.nodes.indexOf(node);
        if (i == length - 1)
            return;

        this.nodes[i] = this.nodes.pop();
        this.bubbleUp(i);
        this.sinkDown(i);
    };

    bubbleUp(i: number): void {
        while (i > 0) {
            const index = Math.floor((i + 1) / 2) - 1;
            if (this.compare(i, index) < 0) {
                this.switchNodes(i, index);
                i = index;
            } else {
                break;
            }
        }
    };

    sinkDown(i: number): void {
        const length = this.size();
        while (i < length) {
            let flag = 0;
            const index1 = 2 * i + 1;
            const index2 = 2 * i + 2;

            const diff = (index, index2) => {
                return index < length && index2 < length && this.compare(index, index2) > 0;
            };

            if (diff(i, index1)) {
                if(diff(index1, index2))
                    flag = 2;
                else
                    flag = 1;
            }
            else if (diff(i, index2)) {
                flag = 2;
            } else {
                break;
            }
            this.switchNodes(i, 2 * i + flag);
            i = 2 * i + flag;
        }
    };

    private compare(index: number, index2: number) {
        const node1 = this.nodes[index];
        const node2 = this.nodes[index2];
        return node1.priority - node2.priority;
    }

    private switchNodes(index: number, index2: number) {
        const temp = this.nodes[index];
        this.nodes[index] = this.nodes[index2];
        this.nodes[index2] = temp;
    }
}