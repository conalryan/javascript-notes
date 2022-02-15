/*
 * Async Patterns
 *	Callbacks
 *	Generators/Coroutines
 *	Promises 
 *
 */

/**
 * Callbacks
 */
setTimeout(function() {
	console.log("callback!");
}, 1000);


/**
 * Callback Hell
 * 	Comes about with a lot of async called simultatneous
 *	Inversion of Control - hand over control to somebody else, I trust you will call me back at
 *		correct time with correct data
 */
setTimeout(function() {
	console.log("one!");
	setTimeout(function() {
		console.log("two!");
		setTimeout(function() {
			console.log("three!");
		}, 1000);
	}, 1000);
}, 1000);


/**
 * Separate callbacks
 */
function trySomething(ok, error) {
	setTimeout(function() {
		var num = Math.random();
		if (num > 0.5) ok(num);
		else err(num);
	}, 1000);
}

trySomething(
	function(num) {
		console.log("Success: " + num);
	},
	function(num) {
		console.log("Error: " + num);
	}
);

/**
 * Node style or Error-first style
 */
function trySomething(cb) {
	setTimeout(function() {
		var num = Math.random();
		if (num > 0.5) cb(null,num);
		else err("Error: Too low");
	},1000);
}

trySomething(function(err,num) {
	if (err) {
		console.log("Error");
	} else {
		console.log("Success: " + num);
	}
});

/**
 * Generators (yield)
 * Comming in ES6
 * Yield is a message passing parameter. Pass messages out, and pass message in
 */
function* gen() {
	console.log("Hello");
	yield null;
	console.log("World");
}

var it = gen();
it.next(); // prints "Hello"
it.next(); // prints "World"

/**
 * Coroutine
 */
function coroutine(g) {
	var it = g();
	return function() {
		return it.next.apply(it, arguments);
	};
}

var run = coroutine(funciton*() {
	var x = 1 + (yield null);
	var y = 1 + (yield null);
	yield(x + y);
});

run();
run(10);
consol.log(
	"Meaning of life: " + run(30).value
);

// example of async call
function getData(d) {
	setTimeout(function() {
		run(d);
	}, 1000);
}

var run = coroutine(funciton*() {
	var x = 1 + (yield getData(10));
	var y = 1 + (yield getData(30));
	var answer = (yield getData("Meaning of life: " + (x + y));
	console.log(answer); // Meaning of life; 42
});

run();

/**
 * Promises
 * Continuation events - subscribe to event
 * Uninverted control. We are still in control of our program. We will be notified when it completes
 * Native in ES6 Promise
 */
var wait = jQuery.Defered();
var p = wait.promise();

p.don(function(value) {
	console.log(value);
});

setTimeout(function() {
	wait.resolve(Math.random())
}, 1000);

// example jQuery Promises
function waitForN(n) {
	var d = $.Deferred();
	setTimeout(d.resolve, n);
	return d.promise();
}

waitForN(1000)
.then(function() {
	console.log("Hello world");
	return waitForN(2000);
})
.then(function() {
	console.log("finally");
})


// ES6 native Promise
function getData(d) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() { resolve(d); }, 1000);
	});
}

var x;

getData(10);
.then(function(num1) {
	x = 1 + num;
	return getData(30);
})
.then(function(num2) {
	var y = 1 + num2;
	return getData("Meaning of life: " + (x + y));
})
.then(function(answer) {
	console.log(answer); // Meaning of life: 42
});

/**
 * Quiz
 *	1. What is "callback hell"? Why do callbacks suffer from "inversion of control"?
 *		It's handing the control of your program to someone else
 *	2. How do you pause a generator? How do you resume it?
 *		yeild next()
 *	3. What is a Promise? How does it solve inversion of control issues?
 *		It's a promise for a future value. It gives you back the control. 
 *		Instead of passing my continuation in, I receive a promise back
 *	4. How do we combine generators and promises for flow contorl?
 *		generators yield out a promise, when promise finishes, have promise restart generator
 */