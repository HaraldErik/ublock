
(function () {
    'use strict';

    const results = [];

    // Helper function to test and log results
    function logResult(testName, testResult) {
        results.push(`${testName}: ${testResult}`);
    }

    // Test 1: Simple math computation performance test
    const startMath = performance.now();
    for (let i = 0; i < 1000000; i++) {
        Math.sqrt(i);
    }
    const endMath = performance.now();
    logResult("Math computation performance (1 million iterations)", `${(endMath - startMath).toFixed(2)} ms`);


    // Test 2: Checking modern JavaScript feature support (Promises)
    const promiseTest = new Promise((resolve) => {
        setTimeout(() => resolve("Promises are supported!"), 100);
    });
    promiseTest.then(result => {
        logResult("Promises support", result);
    });


    // Test 3: Checking async/await support
    async function asyncTest() {
        return "Async/Await is supported!";
    }
    asyncTest().then(result => {
        logResult("Async/Await support", result);
    });


    // Test 4: Checking if localStorage is available and functional
    try {
        localStorage.setItem("testKey", "testValue");
        const localStorageValue = localStorage.getItem("testKey");
        logResult("localStorage support", localStorageValue === "testValue" ? "Supported and functional" : "Supported but not functional");
    } catch (error) {
        logResult("localStorage support", "Not supported or error occurred");
    }


    // Test 5: Fetch API availability
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
            logResult("Fetch API support", "Supported and functional");
        })
        .catch(error => {
            logResult("Fetch API support", "Not supported or error occurred");
        });


    // Test 6: DOM manipulation test
    const testDiv = document.createElement('div');
    testDiv.innerHTML = "JavaScript is able to manipulate the DOM!";
    document.body.appendChild(testDiv);
    logResult("DOM manipulation", "Supported and functional");


    // Test 7: Error handling in JavaScript
    try {
        throw new Error("This is a test error!");
    } catch (error) {
        logResult("Error handling", error.message);
    }


    // Test 8: Web Worker Support
    if (typeof Worker !== "undefined") {
        const workerBlob = new Blob([`
            self.onmessage = function() {
                self.postMessage("Web Worker is supported and functional!");
            };
        `], { type: "application/javascript" });

        const worker = new Worker(URL.createObjectURL(workerBlob));
        worker.onmessage = function (e) {
            logResult("Web Worker support", e.data);
            worker.terminate();
        };
        worker.postMessage("start");
    } else {
        logResult("Web Worker support", "Not supported in this browser");
    }


    // Test 9: Service Worker Support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(function () {
            logResult("Service Worker support", "Supported and functional");
        }).catch(function (error) {
            logResult("Service Worker support", "Failed to register Service Worker: " + error);
        });
    } else {
        logResult("Service Worker support", "Not supported in this browser");
    }


    // Display the results as an alert
    setTimeout(() => {
        alert("JavaScript Test Results:\n" + results.join("\n"));
    }, 500);
})();
