import EventEmitter from "../eventEmitter";

export class Queue<ElementType> extends EventEmitter{

    private values_: Record<number, ElementType>;
    private head_: number;
    private tail_: number;
    private checker_: (element: ElementType) => boolean;

    constructor(checker: (element: ElementType) => boolean = (element) => true) {
        super();
        this.values_ = {};
        this.head_ = 0;
        this.tail_ = 0;
        this.checker_ = checker;
    }

    // Add element at the end of the queue
    public enqueue(element: ElementType): void {
        if (!this.checker_(element))
            throw new Error("The element do not match to the queue's items");
        this.values_[this.tail_] = element;
        this.tail_ += 1;
        this.emit("enqueue", element); // send a signal
    }

    // Remove the element on the head and return it
    public dequeue(): ElementType {
        if (this.tail_ == this.head_)
            throw new Error("Cannot dequeue an empty queue.");
        const element = this.values_[this.head_];
        delete this.values_[this.head_];
        this.head_ += 1;
        this.emit("dequeue", element); // send a signal
        return element;
    }

    // return the element on the head
    public peek(): ElementType {
        if (this.is_empty())
            throw new Error("Cannot peek an empty queue.");
        const element = this.values_[this.head_];
        return element;
    }

    public length(): number {
        return this.tail_ - this.head_;
    }

    public is_empty(): boolean {
        return this.length() == 0;
    }
}
