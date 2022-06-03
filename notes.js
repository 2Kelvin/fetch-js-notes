// CALLBACKS
    // are functions that are passed to other functions as parameters
    // it's called after all the code in the parent function's block has occured/ run
    // example
    function justAFunction(parameter, callback) {
        // do stuff - all the block code here
        callback();
    }
    // callbacks are hard to maintain, mostly when you have multiple callbacks nested in one function
    // promises are better; they were invented to solve this headache

// PROMISES
    // has 3 states: "loading/pending", "successful/fulfilled" & "error/rejected"
    // it's asynchronous
    // example: btw you can make a new promise object through the promise constructor
const myPromise = new Promise((resolve, reject) => {
    const error = false;
    if(!error) {
        resolve("Yes. The promise has been resolved");
    } else {
        reject("No. The promise was rejected");
    }
});

console.log(myPromise); //logs "Yes. The promise has been resolved" since the if statement 'error = false' is true