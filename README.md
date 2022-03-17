
# Table of contents


* [All Classes](#All-Classes)
* [Quick Start](#Quick-Start)
* [Common API Methods](#Common-API-Methods)
  * [Queue](#)

## All Classes

| Classes             | verison |
|---------------------|---------|
| Queue               |  v1.0   |


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


## Common API Methods

### Queue

Basic implementation of a queue.

| Class               | verison | emitter |
|---------------------|---------|---------|
| Queue               |  v1.0   |   yes   |

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
