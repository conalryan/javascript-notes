/*
 * Closure
 * 
 * Comes from lambda calculations
 *
 * Closure is when a function "remembers" and accesses its lexical scope even when that function 
 * is executed outside that lexical scope
 *
 * Inner-functions can reference the scope (vars) of it's enclosing (i.e. lexical scope lookup)
 * Since JS allows functions to be passed as first-class citizens, when the inner-function is passed
 * it can still reference its enclosing scope even though it's executed outside of that scope. The 
 * lexical scope stays attached no matter where the function is passed. It's not a copy of the lexical
 * scope, the lexical scope is kept alive.
 *
 * The only reason we pass functions around is because they can remember their lexical scope, if they
 * couldn't then nobody would use them.
 *
 * It's a live link. Meaning any changes to the var will be reflected when the function is fired
 *
 * Garbage Collection
 *	If you keep a reference to an object, that object does NOT get garbage collected.
 *  Similar process for references to scope. When you execute a function it creates a scope object.
 *	If anyone get a reference to that scope object via a closure, that scope does NOT get garabage 
 * 	collected when the function ends. It keeps the scope around and it can contine to be updated, 
 *	modified and accessed. As long as their is at least one function that keeps a 
 *	reference/closure to that scope, it's kept around and won't be garbage collected.
 */

function foo() {
 	var bar = "bar";

 	/**
   	 * Inner-function baz() has an inner scope buble, however it can reference the scope of its 
 	 * enclosing scope (foo() in this ex.) via lexical scope lookup
 	 */
 	function baz() {
 		console.log(bar);
  	}

 	// functions are passed as first class citizens and can be executed in other environments
	bam(baz);
}

/**
 * Bam accepts function as arg
 */
function bam(baz) {
	// since function is first class citizen and can be passed around, when it's executed it will
	// still have reference to it's lexical scope. Lexical scope stays attahced no matter where
	// function is passed
	baz(); // "bar"
}

foo();

// example 2
function foo() {
	var bar = "bar";

	return function() {
		console.log(bar);
	}
}

function bam() {
	// first () executes foo() which returns a function.
	// second () executes the function that is returned by foo() which still has ref to lexical scope
	foo()(); // "bar"
}

bam();

// example 3
function foo() {
	var bar = "bar";

	setTimeout(function() {
		console.log(bar); // "bar"
	}, 1000);
}

foo();

// example 4
function foo() {
	var bar = "bar";

	$("#btn").click(function(evt) {
		console.log(bar); // "bar"
	});
}

foo();

// example 5
function foo() {
	var bar = "bar";

	setTimeout(function() {
		console.log(bar++);
	}, 100);
	setTimeout(function() {
		console.log(bar++);
	}, 200);
}

foo(); // 0 1

// example 6 - Nested Closure
function foo() {
	var bar = 0;

	setTimeout(function() {
		var baz = 1;
		console.log(bar++);
		
		setTimeout(function() {
			console.log(bar+baz);
		}, 200);
	}, 100);
}

foo(); // 0 2

// example 7 - Closure with loops
for (var i = 1; i <=5; i++) {
	setTimeout(function() {
		console.log("i: " + i);
	}, i*1000);
}
// prints "6" five different times

// The error in example 7 is that we assume that each loop is geting its own i var. This is
// incorrect, you are getting a closure over a single scope, a single i var that continues to 
// update and modify
// The Solution is to get the loop its own scope on every iteration - add an IIFE, now you have 
// a new scope
for (var i = 1; i <=5; i++) {
	(function(i) {
		setTimeout(function() {
			console.log("i: " + i);
		}, i*1000);	
	})(i);
}
// prints "12345"

// Solution 2 - use let keyword
// let creates a new scope per iteration
for (let i = 1; i <= 5, i++) {
	setTimeout(function() {
		console.log("i: " + i);
	}, i*1000);
}

// example 8 - trick Is this closure?
var foo = (function() {
	var o = { bar: "bar" };

	return { obj; o };

})();

console.log(foo.bar.obj.bar); // "bar"

// this is not closure, it is object reference but NOT closure.
// Remember closue definition 
// 	(1) when a function remembers its lexical scope 
//	(2) even when the funciton is execkuting outside its lexicel scope
// In example 8 there is no function being transported out

/*
 * Classic Module Pattern
 *  Most popular pattern in JS
 *	Principle of least privlege or least exposure - encapsulation. Make everything private except
 * 	what you want to make public
 * 	1. Must be an outer wrapper function that gets executed. Doesn't have to be an IIFE
 *	2. Must be 1 or more functions that get returned from that function call (i.e. inner functions)
 *	that have have a closure of the inner private scope
 *
 * You don't have to use an IIFE for your module. If you only need one instance of your module than
 * an IIFE makes sense, however if you want multiple instances of the module than remove the IIFE,
 * and make is a plan old function.
 *	var myFoo = foo();
 *	var yourFoo = foo();
 *
 * I have very rarely seen a need for anyone to have multiple instances of anything in JS. It just
 * ins't that common -Kyle
 */

 // var foo will be a reference ot the returned function in the outer socpe and
 // the function if its named will a reference to the function in the inner scope
var foo = (function() {
	var o = { bar: "bar" };
	return {
		bar: function() {
			console.log(bar);
		}
	}
});

foo.bar(); // "bar"

/*
 * Modified Module Pattern
 * Return an object that specifies what is being returned
 * Now you can add/remove to the public API since you now have a reference to the same object
 */
var foo = (function() {
	var bar = "bar";
	var publicApi = {
		bar: function() {
			console.log(bar);
		}
	}
	return publicApi;
});

foo.bar(); // "bar"

/*
 * Modern Module Pattern
 * Similar to require.js
 */
define("foo", function() {
	var o = { bar: "bar" };

	return {
		bar: function() {
			console.log(o.bar);
		}
	}
});

/*
 * ES6+ Module Pattern
 * File based
 * Everything in the file is essentially wrapped in a function to create the scope
 * 
 */
var o = { bar: "bar" };

export function bar() {
	return o.bar;
}

import bar from "foo"; // just import the bar method
module foo from "foo"; // import the entire module
import * from "foo"; // import everything from foo