
/**
 * @class 
 * @description Basic queue implementation
 * Emitter class
 * @version v1.0
 */
class Queue {

    /**
     * @param {Function} checker Function that 
     * check if all elements match to the expected type.
     */
    constructor(checker = (elt) => true) {
        this.values = {};
        this.head = 0;
        this.tail = 0;
        this.checker = checker;
    }

    // Add element at the end of the queue
    enqueue(element) {
        if (!this.checker(element))
            throw new Error("The element do not match to the queue's items");
        this.values[this.tail] = element;
        this.tail += 1;
        this.emit("enqueue", element); // send a signal
    }

    // Remove the element on the head and return it
    dequeue() {
        if (this.tail == this.head)
            throw new Error("Cannot dequeue an empty queue.");
        const element = this.values[this.head];
        delete this.values[this.head];
        this.head += 1;
        this.emit("dequeue", element); // send a signal
        return element;
    }

    // return the element on the head
    peek() {
        if (this.is_empty())
            return new Error("Cannot peek an empty queue.");
        const element = this.values[this.head];
        return element;
    }

    length() {
        return this.tail - this.head;
    }

    is_empty() {
        return this.length() == 0;
    }

    /* Emiter zone (need to be update to an interface) */
    emit(signal, data) {
        setTimeout(() => {
            if (this.callbacks && this.callbacks[signal]) {
                for (let index in this.callbacks[signal]) {
                    this.callbacks[signal][index](data);
                }
            }
        }, 0)
    }
    on(signal, callback) {
        if (!this.callbacks)
            this.callbacks = {};
        if (!this.callbacks[signal]) {
            this.callbacks[signal] = [];
        }
        this.callbacks[signal].push(callback);
    }
}


module.exports = Queue;
