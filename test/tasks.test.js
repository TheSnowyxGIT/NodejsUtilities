const assert = require("assert")

const utilities = require("../index")

// For simulating delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Tasks", () => {
    it('added non function task', function() {
        const tasks = new utilities.Tasks();
        assert.throws(() => tasks.add_task(5));
    })
    it('added function task', function() {
        const tasks = new utilities.Tasks();
        assert.doesNotThrow(() => tasks.add_task(()=>{}));
    })
    it('basic single task', function(done) {
        this.timeout(500); // wait for the events
        const tasks = new utilities.Tasks();

        let key;

        tasks.on("finished", cur_key => {
            assert.equal(key, cur_key);
            done();
        })

        key = tasks.add_task(()=>{})
    })
    it('multiple tasks', function(done) {
        this.timeout(500); // wait for the events
        const tasks = new utilities.Tasks();

        let count = 0;
        let keys = [];

        tasks.on("finished", cur_key => {
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
