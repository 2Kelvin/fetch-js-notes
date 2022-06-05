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
    // has 3 states: "loading(pending)", "successful/(fulfilled)" & "error/(rejected)"
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
    // the promise above doesn't display the value, it displays the state of the promise hence the evolution of thenables

// THENABLES
    // it's basically a chained promise but unlike a promise, it gives you the value to work with
    myPromise.then(value => {
        return value + 1;
    }).then(newValue => {
        console.log(newValue);
    }).catch(err => { //catch is responsible for catching the error in the code and dispalying it
        consolelog(err);
    })
    
    mySecondPromise = new Promise((resolve, reject) => {
        setTimeout(function () { 
            resolve("myNextPromise resolved"); 
        }, 3000);
    });

    mySecondPromise.then(value => {
        console.log(value);
    });
    myPromise.then(value => {
        console.log(value);
    });
    // 'myPromise' will output first before 'mySecondPromise' because it has a delay of 3 seconds


// FETCH API
    // fetch has an inbuilt promise in it : fetch automatically returns a promise
    // fetch requests data from another server
    // example:
    const users = fetch("https://jsonplaceholder.typicode.com/users");
    console.log(users); //here you'll get a pending state; as the fetch retrieves the data to your site/app
    
    // using fetch with thenables
fetch("https://jsonplaceholder.typicode.com/users")
    .then(Response => {
        return Response.json();
    }).then(data => {
        console.log(data);
    })
