/*
 * Scope
 *	- Nested Scope
 *	- Hoisting
 *	- this
 *
 * JavaScript is a compiled language!
 */
 
/* -----------------------------------------------------------------------------------------------
 * Scope: Where to look for things
 * JavaScript has function scope only
 *
 * Compiler - First pass of code is done by compiler
 * Executor - Then microseconds later second pass of code is done by executor
 *
 */

// var declarations are actually 2 operations
// 1: Compiler registers variable with scope
// 2. Executor assigns value to variable
var foo = "bar";

// Operation 1: Compiler looks for declarations (i.e. var foo)

// compiler asks "what scope am i in?" "Hey Scope Manager do i have a foo declared already?"
// if not then register it

// compiler recursively goes through functions to register all local vars in the function's scope
function bar() {
	var foo = "baz";
}

// compiler will regiter any parameters in the functions scope (i.e. baz(foo), compiler registers foo in baz's scope)
function baz(foo) {
	foo = "bam";
	bam = "yay";
}

// Operation 2: Execute phase
// LHS RHS
// Left-Hand-Side, Right-Hand-Side
// of an assignment (i.e. =)
var leftSide = "rightSide"; // LHS is target, RHS is source

// Executor says "Hey Scope manager, I have a declaration for leftSide, do you have a LHS registed leftSide?"
// if so, then Scope Manager give reference of var to executor, then executor assigns "rightSide" to it

/* -----------------------------------------------------------------------------------------------
 * Function Declaration vs. Function Expression
 * 
 * Declarations are hoisted
 * Expressions are not hoisted
 */

// declaration
function functionDeclaration() {

}

// annonymous function expression - avoid this!
var functionExpression = function() {

}

// named function expression - always use named functions!
var functionExpression = function someName() {
	var foo = "baz";
	foo = someName; // function...
}

someName(); // Error!

/* -----------------------------------------------------------------------------------------------
 * Lexical Scope vs. Dynamic Scope
 *
 * Dynamic
 *	- bash script
 *	- looks for vars from call site i.e. runtime
 *
 * Lexical 
 *	- Most other languages. 
 *	- Like a building. Start on our current (bottom) floor, if not found go up one floor, and so on
 *  - New scopes are created
 *		- functions
 *		- catch blocks (i.e. try catch)
 *		- curly braces with let keyword ES6+
 *	- undeclared vs. undefined
 *		- undeclared means the var has never been declared in any scope
 *		- undefined means the var is declared but the values is currently empty
 */

// eval cheats! don't use it!  It treats string as if it was code that was there at author time
// eval slows down your code b/c compiler can't optimize scope 
 var bar = "bar";

 function foo(str) {
 	eval(str); // cheating!
 	console.log(bar); // 42
 }

foo("var bar = 42;");

// with keyword
var obj = {
	a: 2,
	b: 3,
	c: 4
}

// instead of referencing obj over and over
obj.a = obj.b + obj.c;

// with is shorthand
with (obj) {
	a = b + c;
	d = 3; // ??
}

obj.d; // undefined
d; // 3 -- oops! global

/* -----------------------------------------------------------------------------------------------
 * IIFE Pattern
 *
 * 2nd most popular pattern in JS
 *
 * Function scope
 *	- Hide objects in new scope
 */
var foo = "foo";

(function IIFE() {
	var foo = "foo2";
 	console.log(foo); // "foo2"
})();

console.log(foo); // "foo"

// IIFE variation pass in object
(function IIFE(global) {
	var somePrivateVar = "This value is hidden in my IIFE scope";
 	global.foo = "some value I want to make public";
})(window);

/* -----------------------------------------------------------------------------------------------
 * Block Scope in ES6
 *
 * let (ES6+) 
 *	- Basically any pair of {} it will hijack the scope
 * 	- let keyword does not hoist
 *	- implicitly hijacks block - can be tricky to remember/debug
 */
function foo() {
 	var bar = "bar";
 	for (let i = 0; i < bar.length; i++) {
 		console.log(bar.chartAt(i));
 	}
	console.log(i); // ReferenceError
}

foo();

// let block statements
function foo(bar) {
	/* let */ { let baz = bar;
		console.log(baz); // "bar";
	}
	console.log(baz); // Error
}

foo("bar");

/* -----------------------------------------------------------------------------------------------
 * Theoretical dynamic scope
 * 
 * Looks for variables from call site
 * foo() doesn't have bar, but who called me...baz() did. Does baz() have a bar?...it does, let's use it!
 */
function foo() {
	console.log(bar); // dynamic!
}

function baz() {
	var bar = "bar";
	foo();
}

baz();

/* -----------------------------------------------------------------------------------------------
 * Hoisting
 * 
 * Not actually moved, or hoisted. It's just that they were compiled first
 * headers files in c++ are essentially hositing.  It tells the compiler what's available
 * let doesn't hoist
 */

// example 1
a; 
b;
var a = b;
var b = 2;
b;
a;

// after compiler it is conceptually
var a;
var b;
a; // undefined
b; // undefined
a = b; // undefined
b = 2; // 2
b; // 2
a; // undefined

// example 2 with functions
var a = b();
var c = d();
a;
c;

function b() {
	return c;
}

var d = function() {
	return b();
}

// after compiler it is conceptually
function b() {
	return c;
}
var a; // undefined
var c; // undefined
var d;
a = b();
c = d();
a;
c;
d = function () {
	return b();
}

// example 3 let does't hoist
function foo(bar) {
	if (bar) {
		console.log(baz); // ReferenceError - Can't use before it's declared
		let baz = bar;
	}
}

foo("bar");

/* -----------------------------------------------------------------------------------------------
 * this keyword
 * 
 * Every function while executing has a refernce to its current execution context called this
 * This is more like dynamic scopinog, it depends on call site. 
 * This tells us the address of the building to go look in
 */

/**
 * 4th in precendence
 * Default binding:
 *	- In strict mode it is undefined
 *	- Not in strict mode it is the global object
 */ 
function foo() {
	console.log(this.bar);
}

var bar = "bar1";

foo(); // "bar1"

/**
 * 3rd in precendence
 * Implicit binding
 * 	- Object property reference
 *	- aka base object, context object, owning object
 */
function foo() {
	console.log(this.bar);
}

var bar = "bar1";
var o2 = { bar: "bar2", foo: foo };
var o3 = { bar: "bar3", foo: foo };

// in JS everything is a reference!
// therefore foo() and o2.foo() are references to the same function
foo(); 		// "bar1"
o2.foo(); 	// "bar2"
o3.foo(); 	// "bar3"

// it doesn't matter where a function is declared, no one owns it more than anyone else
var o1 = {
	bar: "bar1",
	foo: function() {
		console.log(this.bar);
	}
};
var o2 = { bar: "bar2", foo: o1.foo };

var bar = "bar3";
var foo = o1.foo;

o1.foo();		// "bar1"
o2.foo(); 		// "bar2"
foo();			// "bar3"

// Binding Confusion example
// you cannot cross the lexical scope to the this-dynamic-like scope
function foo() {
	var bar = "bar1";
	baz();
}

function baz() {
	console.log(this.bar);
}

var bar = "bar2";
foo(); 			// ??? -> "bar2"

/**
 * 2nd in precendence
 * Explicit binding
 *	- .call
 *	- .apply
 *	- both take a 'this arg' to use as binding
 *
 */
function foo() {
	console.log(this.bar);
}

var bar = "bar1";
var obj = { bar: "bar2" };

foo();			// "bar1"
foo.call(obj);	// "bar2"

// Hard Binding example
function foo() {
	console.log(this.bar);
}

var obj = { bar: "bar" };
var obj2 = { bar: "bar2" };

// make a reference to the original function
var orig = foo;
// overwrite the function to call the orignal function but force orig to always be called with 
// the correct this binding.
foo = function() { orig.call(obj); };

foo();				// "bar"
foo.call(obj2); 	// ??? -> "bar"

// Hard Bind Utiltiy example, although .bind is available in JS now
function bind(fn, o) {
	return function() {
		fn.call(o);
	}
}

function foo() {
	console.log(this.bar);
}

var obj = { bar: "bar" };
var obj2 = { bar: "bar2" };

foo = bind(foo, obj);

foo(); 				// "bar"
foo.call(obj2); 	// ??? -> "bar"

/**
 * 1st in precendence
 * New keyword binding
 *
 * Constructor call (on a function i.e. called with new keyword in front of it)
 *	1. Brand new object is created out of thin air
 *	2. Our new object gets linked
 *	3. Our new object gets bound as the this keyword for purposes of function call
 *	4. If function does not return anything, the function will implicitly return this;
 *
 */
function foo() {
	this.baz = "baz";
	console.log(this.bar + " " + baz);
}

var bar = "bar";
var baz = new foo();	// ??? undefined undefined

// To find out what this is
// 1. find call site
// 2. Was function called with 'new'? -> use that object
// 3. Was function called with .call or .apply? -> use that object
// 4. Was function called via containing/owning object (context)? -> use that object
// 5. Default: global object (except strict mode)