
# Table of contents


* [All Classes](#All-Classes)
* [Quick Start](#Quick-Start)
* [Details](#Details)
  * [Queue](#Queue)
  * [Tasks](#Tasks)

## All Classes

| Classes             | verison |
|---------------------|---------|
| Queue               |  v1.0   |
| Tasks               |  v1.0   |


## Quick Start

```js
import { Queue } from '@adrien.pgd/nodejsutilities'

const my_queue = new Queue();

/*...*/
```
Or

```js
import utilities from '@adrien.pgd/nodejsutilities'

const my_queue = new utilities.Queue();

/*...*/
```


## Details

### Queue

Basic implementation of a queue.

| Class               | verison | event emitter | unit tested |
|---------------------|---------|---------------|-------------|
| Queue               |  v1.0   |   yes         |  yes        |

#### Methods

| name                | description                              | Error (thow an error)                       |
|---------------------|------------------------------------------|---------------------------------------------|
| enqueue             | Add an item at the end of the queue      | if the item do not match the format checker |
| dequeue             | Remove the first item and return it      | if the queue is empty                       |
| peek                | return the first item of the queue       | if the queue is empty                       |
| length              | Return the length of the queue           |                                             |
| is_empty            | return if the queue is empty or not      |                                             |


#### emitter

| signal              |   data             | description                                |
|---------------------|--------------------|--------------------------------------------|
| enqueue             |  (new_item)        |   Sent when an element is enqueue          |
| dequeue             |  (deleted_item)    |   Sent when an element is dequeue          |


#### Example

```js
import { Queue } from '@adrien.pgd/nodejsutilities'

const my_queue = new Queue();

my_queue.on("enqueue", new_item => {
    console.log(`New element added at the end of the queue. Element(${new_item})`)
})

my_queue.on("dequeue", deleted_item => {
    console.log(`First element of the queue have been removed. Element(${deleted_item})`)
})

my_queue.enqueue(5); // my_queue = {5}
const value = my_queue.peek(); // value = 5
const value2 = my_queue.dequeue(); // value2 = 5; my_queue = {}
```

Item format checker

```js
import { Queue } from '@adrien.pgd/nodejsutilities'

const checker = item => {
    return typeof(item) == "number";
}

const my_queue = new Queue();

my_queue.enqueue(5); // correct
my_queue.enqueue("Hey"); // incorrect (throw an error)
```

### Tasks

Implementation of a Tasks system based on a queue.
The purpose of this class is to provide a queue that will receive functions and executed them by order.
Example of use : If you need to chain advertising messages.

| Class               | verison | event emitter | unit tested |
|---------------------|---------|---------------|-------------|
| Tasks               |  v1.0   |   yes         |  yes        |

#### Methods

| name                | description                              | Error (thow an error)                       |
|---------------------|------------------------------------------|---------------------------------------------|
| add_task            | Add a task in the queue                  | if the task is not a function               |

#### emitter

| signal              |   data             | description                                |
|---------------------|--------------------|--------------------------------------------|
| started             |  (task_uuid)       |   Sent when a task is execute              |
| finished            |  (task_uuid)       |   Sent when a task is finished             |


#### Example

```js
import { Tasks } from '@adrien.pgd/nodejsutilities'

// delay simulation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const my_tasks = new Tasks();
let last_ad_uuid;

my_tasks.on("finished", uuid => {
    if (last_ad_uuid === uuid)
        console.log(`Next ad`);
    else 
        console.log(`end`);
})

tasks.add_task(async ()=>{await sleep(3000); console.log("First add !")})
tasks.add_task(async ()=>{await sleep(3000); console.log("Second add !")})
last_ad_uuid = tasks.add_task(async ()=>{await sleep(3000); console.log("Last add !")})

```
