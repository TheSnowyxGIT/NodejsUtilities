import { Tasks } from "../src/index";

import * as assert from "assert"

// delay simulation
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Tasks", () => {
    it('added function task', function() {
        const tasks = new Tasks();
        assert.doesNotThrow(() => tasks.add_task(()=>{}));
    })
    it('basic single task', function(done) {
        this.timeout(500); // wait for the events
        const tasks = new Tasks();

        let key: string;

        tasks.on("finished", (cur_key: string) => {
            assert.equal(key, cur_key);
            done();
        })

        key = tasks.add_task(()=>{})
    })
    it('multiple tasks', function(done) {
        this.timeout(500); // wait for the events
        const tasks = new Tasks();

        let count = 0;
        let keys: Array<string> = [];

        tasks.on("finished", (cur_key: string) => {
            assert.equal(keys[count - 1], cur_key);
            if (count == 3){
                done();
            }
        })

        keys.push(tasks.add_task(async ()=>{await sleep(5); count += 1;}));
        keys.push(tasks.add_task(async ()=>{await sleep(5); count += 1;}));
        keys.push(tasks.add_task(async ()=>{await sleep(5); count += 1;}));
    })
})
