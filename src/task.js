const Queue = require("./queue");
const uuid = require("uuid")

/**
 * @class 
 * @description Task system implementation
 * Emitter class
 * @version v1.0
 */
class Tasks {
    /**
     * Privates variables
     */
    #task_queue;
    #running
    #callbacks;

    constructor() {
        this.#task_queue = new Queue(elt => {
            return typeof elt === "object" && typeof elt.key === "string"
                && typeof elt.task === "function";
        })

        // true if a task is running
        this.#running = false;

        /* private event holder */

        // When a task have been added
        this.#task_queue.on("enqueue", () => {
            if (!this.#running) {
                this.#exec_next_task();
            }
        })

        // When a task have been removed (when a task is finished)
        this.#task_queue.on("dequeue", () => {
            if (!this.#task_queue.is_empty()) {
                this.#exec_next_task();
            }
        })
    }

    add_task(task) {
        const key = uuid.v4();
        const formated_task = {
            key: key,
            task: task
        };
        this.#task_queue.enqueue(formated_task); // will trhow if the task is not correct
        return key;
    }

    #exec_next_task = async () => {
        this.#running = true; // blocking the starting of the nexts tasks
        const { key, task } = this.#task_queue.peek();
        this.#emit("started", key);
        await task(); // wait until the end of the task
        this.#task_queue.dequeue(); // When the task is finished
        this.#emit("finished", key);
        this.#running = false;
    }


    /* Emiter zone (need to be update to an interface) */

    #emit = (signal, data) => {
        setTimeout(() => {
            if (this.#callbacks && this.#callbacks[signal]) {
                for (let index in this.#callbacks[signal]) {
                    this.#callbacks[signal][index](data);
                }
            }
        }, 0)
    }

    on(signal, callback) {
        if (!this.#callbacks)
            this.#callbacks = {};
        if (!this.#callbacks[signal]) {
            this.#callbacks[signal] = [];
        }
        this.#callbacks[signal].push(callback);
    }
}

module.exports = Tasks;
