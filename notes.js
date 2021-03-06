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

// THENABLES (.then)
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
        data.forEach(user => {
            console.log(user);
        })
    })


// ASYNC / AWAIT
    //  it says, wait for this to happen before doing this... 
    const myusers = {
        userList: []
    };
    
    // when defining async functions use the keyword "async" from the word go
    // "await" can only be used inside an "async" function
    const myCoolFunction = async () => {
        const theResponse = await fetch("https://jsonplaceholder.typicode.com/users"); //wait to get the data from fetch then do the next step
        const jsonUserData = await theResponse.json(); //the "json()" method also returns a promise hence why we use "await"
        return jsonUserData;
    };
    
    // anotherFunc here is an async function that returns the "jsonUserData" from "myCoolFunction" and logs it
    const anotherFunc = async () => {
        const data = await myCoolFunction(); //waiting for the data from "myCoolFunction" before logging it afterwards
        console.log(data);
    };

    anotherFunc();
    
    // async / await example
    const getAllUserEmails = async () => {
        const fetchedResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        const fetchedJsonUserData = await fetchedResponse.json();
        const usersEmailsArray = fetchedJsonUserData.map(user => user.email);
        console.log(usersEmailsArray);
    };

    getAllUserEmails();
    

// 2ND PARAMETER OF THE FETCH API (object) ->> the object has some settings that can be defined in it
// USING THE "GET" method; allows you to "read" the API data
    const getDadJokes = async () => {
        const response = await fetch("https://icanhazdadjoke.com/", { //the object( 2nd parameter ) ->> has so many other properties other than these 2, check them out on MDN
            method: "GET", // 'GET' is the default method used but you can also use 'POST'
            headers: { // it's a nested object that defines the type of data you want to receive, in this case we want 'json' data
                Accept: "application/json"
            }
        });   
        
        const jsonDadJokesData = await response.json(); 
        console.log(jsonDadJokesData.joke);
    };

    getDadJokes();
    
    // "json" is the most used format in most cases but you can use other formats like "text" ...
    // getting the dad-jokes data in form of a text instead of json
    const getDadJokesText = async () => {
        const response = await fetch("https://icanhazdadjoke.com/", { 
            method: "GET", 
            headers: { 
                Accept: "text/plain"
            }
        });   
        
        const textDadJokesData = await response.text(); 
        console.log(textDadJokesData);
    };

    getDadJokesText();
    
// USING A "POST" OBJECT IN FETCH ( method: "POST" )
    // it allows you to "write" (edit & delete) the API data
    const jokeObject = {
        "id": "RZv4h3gV0g",
        "joke": "Is the pool safe for diving? It deep ends.",
    };

    const postDataDadJoke = async (jokeObj) => {
        const response = await fetch("https://httpbin.org/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jokeObj)
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);
    };
    
    postDataDadJoke(jokeObject);

// REQUESTING $ ADDING DATA USING THE "FETCH URL"
    const requestJoke = async (firstName, lastName) => {
        const response = await fetch(`http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}&limitTo=[nerdy]`); // "?" in a fetch url signifies the start of the first parameter been passed on | "&" joins/ chains 2 parameters together
        const jsonResponse = await response.json();
        console.log(jsonResponse.value.joke);
    };

    requestJoke("Bruce", "Wayne");

// ABSTRACT INTO FUNCTIONS -> how ur code will look like in an actual app; here we're requesting data from a form and inserting it into the API data
    // Getting Data From a Form
    const getDataFromForm = () => {
        const requestObj = {
            firstName: "Jackie",
            lastName: "Chan",
            categories: ["nerdy"]
        };   
        return requestObj;
    };

    const buildRequestUrl = (requestData) => {
        return (`http://api.icndb.com/jokes/random?${requestData.firstName}&${requestData.lastName}&${requestData.categories}`);
    };

    const nowRequestJoke = async (url) => {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const joke = jsonResponse.value.joke;
        postJokeToConsole(joke);
    };

    const postJokeToConsole = (joke) => {
        console.log(joke);
    };

    // Procedural workflow of the above 4 functions (joining them together to perform a single task)
    const processJokeRequest = async () => {
        const requestData = getDataFromForm();
        const requestURL = buildRequestUrl(requestData);
        await nowRequestJoke(requestURL);
        console.log("I got the joke! I got the joke!");
    };
    processJokeRequest();
    