import {v4 as uuidV4} from "uuid";
import EventEmitter from "../eventEmitter";
import { Queue } from "./queue";



interface TaskObject {
    key: string,
    func: (...params: any) => any
}

export class Tasks extends EventEmitter {

    private task_queue_: Queue<TaskObject>;
    private running_: boolean;

    constructor() {
        super();

        this.task_queue_ = new Queue();

        // true if a task is running
        this.running_ = false;

        // When a task have been added
        this.task_queue_.on("enqueue", () => {
            if (!this.running_) {
                this.exec_next_task();
            }
        })

        // When a task have been removed (when a task is finished)
        this.task_queue_.on("dequeue", () => {
            if (!this.task_queue_.is_empty()) {
                this.exec_next_task();
            }
        })
    }

    public add_task(task: (...params: any) => any) {
        const key: string = uuidV4();
        const formated_task: TaskObject = {
            key: key,
            func: task
        };
        this.task_queue_.enqueue(formated_task);
        return key;
    }

    private exec_next_task = async () => {
        this.running_ = true; // blocking the starting of the nexts tasks
        const { key, func } = this.task_queue_.peek();
        this.emit("started", key);
        await func(); // wait until the end of the task
        this.task_queue_.dequeue(); // When the task is finished
        this.emit("finished", key);
        this.running_ = false;
    }
}
