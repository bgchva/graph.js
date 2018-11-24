import {MinPriorityQueue} from '../src/algorithms/minPriorityQueue';

describe('min priority queue', () => {
    let queue: MinPriorityQueue<number>;
    beforeAll(() => {
        queue = new MinPriorityQueue<number>();
    });

    describe('empty.', () => {
        it('should return size', () => {
            const result = queue.size();
            expect(result).toEqual(0);
        });

        it('should return top element', () => {
            const result = queue.top();
            expect(result).toEqual(null);
        });

        it('should return null on pop', () => {
            const result = queue.pop();
            expect(result).toEqual(null);
        });

        it('should return null on remove', () => {
            const result = queue.remove(1);
            expect(result).toEqual(false);
        });
    });

    describe('1 element.', () => {
        const content = 1;
        it('should add element to queue', () => {
            queue.push(content, 8);
            const size = queue.size();
            expect(size).toEqual(1);
        });

        it('should return top element', () => {
            const result = queue.top();
            expect(result).toEqual(content);
        });

        it('should pop element', () => {
            const result = queue.pop();
            expect(result).toEqual(content);

            const size = queue.size();
            expect(size).toEqual(0);
        });
    });

    describe('2 elements.', () => {
        beforeAll(() => {
            queue.push(1, 8);
            queue.push(2, 1);
        });

        it('should return correct size', () => {
            const result = queue.size();
            expect(result).toEqual(2);
        });

        it('should return correct top element', () => {
            const result = queue.top();
            expect(result).toEqual(2);
        });

        it('should remove element', () => {
            const result = queue.remove(2);
            expect(result).toEqual(true);

            const top = queue.top();
            expect(top).toEqual(1);
        });

        it('should fail to remove element again', () => {
            const result = queue.remove(2);
            expect(result).toEqual(false);
        });

        it('should pop element', () => {
            const result = queue.pop();
            expect(result).toEqual(1);
        });
    });

    describe('complex  queue', () => {
        beforeAll(() => {
            queue.push(1, 2);
            queue.push(2, 5);
            queue.push(4, 3);
            queue.push(3, 8);
            queue.push(7, 39);
            queue.push(5, 2);
        });

        it('should remove element', () => {
            const result = queue.remove(1);
            expect(result).toEqual(true);
        });

        it('should first element', () => {
            const result = queue.top();
            expect(result).toEqual(5);
        });
    });
});