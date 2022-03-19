const assert = require("assert")

const utilities = require("../index")

describe("Basic Queue", () => {
    it('new instance empty', () => {
        const queue = new utilities.Queue();
        assert.equal(queue.is_empty(), true);
        assert.equal(queue.length(), 0);
    })
    it('enqueue one element', () => {
        const queue = new utilities.Queue();
        queue.enqueue(5);
        assert.equal(queue.is_empty(), false);
        assert.equal(queue.length(), 1);
        assert.equal(queue.peek(), 5);
    })
    
    it('dequeue one element', () => {
        const queue = new utilities.Queue();
        queue.enqueue(5);
        queue.dequeue();
        assert.equal(queue.is_empty(), true);
        assert.throws(queue.peek);
    })

    it('dequeue multiple elements', () => {
        const queue = new utilities.Queue();
        queue.enqueue(5);
        queue.enqueue(6);
        
        assert.equal(queue.dequeue(), 5);
        assert.equal(queue.dequeue(), 6);
        assert.throws(queue.dequeue);
    })
})

describe("Checker Queue", () => {
    it('enqueue corrects elements', () => {
        const queue = new utilities.Queue( elt =>{
            return typeof elt === "number" && elt % 2 == 0
        });
        assert.doesNotThrow(()=>queue.enqueue(0))
        assert.doesNotThrow(()=>queue.enqueue(-2))
        assert.doesNotThrow(()=>queue.enqueue(4))
        assert.doesNotThrow(()=>queue.enqueue(2222))
    })

    it('enqueue bads elements', () => {
        const queue = new utilities.Queue( elt =>{
            return typeof elt === "number" && elt % 2 == 0
        });
        assert.throws(()=>queue.enqueue("salut"))
    })
})
