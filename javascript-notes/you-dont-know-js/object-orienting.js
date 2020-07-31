/*
 * Object-Orienting
 * 	Common OO Patterns
 *		Singleton Pattern
 *		Observer Pattern
 * 	prototype
 *	"Inheritance" vs. "Behavior Delegation"
 */

/* -----------------------------------------------------------------------------------------------
 * Common OO Patterns
 */

/**
 * Singleton
 */
var Router = function() {
	// Singleton!
 	if (Router.__instance__) {
 		return Router.__instance__;
 	}

 	Router.__instance__ = this;
 	this.routes = {};
}

Router.prototype.setRoute = function(match, fn) {
 	this.routes[match] = fn;
};

var myrouter = new Router();
var another = new Router();

myrouter === another;

/**
 * Observer Pattern
 */
function PageController(router) {
	this.router = router;
	this.router.on("navigate",
		this.fetchPage.bind(this)
	;
}

PageController.prototype.fetchPage = function(d) {
	$.ajax({
		url: d.page_url
	})
	.done(this.loaded.bind(this,d.page_url));
};

PageController.prototype.loaded = function(d.u) {
	// display the page content from 'd'
	// ...
	this.router.emit("pageLoaded",u);
};

var router = new Router();
var thepage = new PageController(router);

/* -----------------------------------------------------------------------------------------------
 * Prototype
 *	Every single "object" is built by a constructor function
 * 	Each time a constructor is called, a brand new object is created
 *	A constructor makes an object that is linked to the constructors own prototype
 *	
 *	C++ and Java should have been called Class oriented as opposed to object oriented
 *  In JS we don't call classes to create objects, we create objects out of thin air
 */

 /*
  * Before the above code even gets called
  * There is a function named Object
  * Object has a property that is an object called .prototype
  * it has toString() etc
  * __proto__ is a public reference for private [[Prototype]] an internal link reference used by JS
  */
function Object() {}

Object.prototype {
	constructor: function Object()
	hasOwnProperty: function hasOwnProperty()
	isPrototypeOf: function isPrototypeOf()
	propertyIsEnumerable: function propertyIsEnumerable()
	toLocalString: function toLocalString()
	toString: function toString()
	valueOf: function valueOf()
	__defineGetter__: function __defineGetter__()
	__defineSetter__: function __defineSetter__()
	__lookupGetter__: function __lookupGetter__()
	__lookupSetter__: function __lookupSetter__()
	get __proto__: function get __proto__()
	set __proto_: function set __proto_()
}

Object.constructor function Function() { [native code] }

// execute 
Object() {
	__proto__: {
		constructor: function Object()
		hasOwnProperty: function hasOwnProperty()
		isPrototypeOf: function isPrototypeOf()
		propertyIsEnumerable: function propertyIsEnumerable()
		toLocalString: function toLocalString()
		toString: function toString()
		valueOf: function valueOf()
		__defineGetter__: function __defineGetter__()
		__defineSetter__: function __defineSetter__()
		__lookupGetter__: function __lookupGetter__()
		__lookupSetter__: function __lookupSetter__()
		get __proto__: function get __proto__()
		set __proto_: function set __proto_()
	}
}

function foo() {}

foo.prototype {
	constructor: function foo() {
		arguments: null
		caller: null
		length: 0
		name: "foo"
		prototype: function()
		__proto__: function()
		[[FunctionLocation]]
		[[Scopes]]
	}
	__proto__: Object // same as Object__proto__ above
}
foo.prototype.constructor function foo() {}
foo.prototype.__proto__ Object // same as Object__proto__ above

foo.constructor function() { [native code] }

foo.__proto__ function() { [native code] }

// Example
function Foo(who) {
 	this.me = who;
 }
 Foo.prototype.identify = function() {
 	return "I am " + this.me;
 };

 var a1 = new Foo("a1");
 var a2 = new Foo("a2");

 a2.speak = function() {
 	alert("Hello, " + this.identify() + ".");
 };

a1.constructor === Foo;
a1.constructor === a2.constructor;
a1.__proto__ === Foo.prototype;
a1.__proto__ == a2.__proto__; // call it "Dunder proto" cool kid JS lingo It's non-standard until ES6, IE didn't have it before IE11
a1.__proto__ === Object.getPrototypeOf(a1);
a2.__proto__ == a2.constructor.prototype; // hack

// Watch out .prototpye and .constructor are writable properties
function foo() {}
foo.prototype {
	constructor: function foo()
	__proto__: Object
}

/*
 * Avoid Shadowing!
 */
a.identify = function() { // <-- Shadowing
	alert("Hello, " + Foo.prototype.identify.call(this)) + ".");
};

/*
 * Automatically reference call site of Foo
 */
 Foo.prototype.identify = function() {
 	return "I am " + this.me;
 };

 Foo.prototype.speak = function() {
 	alert("Hello " + this.identify() + ".");
 };

 var ai = new Foo("a1");
 a1.speak(); // alerts: "Hello, I am a1."

 /*
  * Lexical Scope: this keyword tells us which building to go into
  * Dynamic Scope: this keyword tells us how we are going to find properties when they don't exist on 
  * the direct object we're working with. Looks a floor at a traveling up the prototype chain
  */

/*
 * Extending
 */
function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
 	return "I am " + this.me;
};

function Bar(who) {
 	Foo.call(this, who);
}
// Bar.prototpy = new Foo(); // Or...
Bar.prototype = Ojbect.create(Foo.prototype);
// NOTE: .constructor is broke here, it will point to Foo, need to fix, can add the property

 // Object.create does first two steps new keyword does
 // 1. Create a brand new object
 // 2. Links it
 // Does not do 3 and 4
 // 3. There is no constructor for it to bind 'this' to
 // 4. Does not need to return 'this'
Bar.prototype.speak = function() {
	alert("Hello, " + this.identify());
}

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak(); // alerts: "Hello, I am b1"
b2.speak(); // alerts: "Hello, I am b2"

b1.constructor; // Foo

// Be careful with putting all functions in object literal form on .prototype
// You have now thrown away the original .prototype which has references to
// .consturctor and possibly other linkages that are now gone
// Generally it's better to list each function out
// Bar.prototype.speak = function() {}
// Bar.prototype.someOtherFn = function() {}
Bar.prototype = {
	speak: function speak() {
		alert("Hello, " + this.identify());		
	},
	someOtherFn: function someOtherFn() {}
}

// 3rd party lib can rewrite 'this' reference
function Foo(who) {
	this.me = who;
}

Foo.prototype.speak = function() {
	alert("Hello, " + this.me);
}

var a1 = new Foo("a1");

// JQuery will force 'this' to the element
//$("speak").click(a1.speak);

// bind the correct 'this'
$("speak").click(a1.speak).bind(this);

/**
 * One place where using var self = this is acceptable
 * Need to unbind a named function
 * However, when you hard bind the 'this' you lose the reference to the
 * named function
 */
NotesManager.prototype.showHelp = function() {
	this.$help.show();

	document.addEventListener("click",function __handler__(evt){
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();

		// unbinding the named function '__handler__'
		// the binding is no longer 
		document.removeEventListener("click",__handler__,true);
		this.hideHelp();
	}.bind(this),true); // .bind(this) means there is no longer a ref to the named function
};

/**
 * Solution is to use var self = this;
 */
NotesManager.prototype.showHelp = function() {
	var self = this;
	self.$help.show();

	document.addEventListener("click",function __handler__(evt){
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();

		// unbinding the named function '__handler__'
		document.removeEventListener("click",__handler__,true);
		self.hideHelp();
	},true);
};

/**
 * Quiz
 *	1. What is a constructor?
 *		It is a function that is called with the new keyword in front of it
 *		.constructor is a property
 *	2. What is [[Prototype]] and where does it comes from?
 *		It is a linkage from one object to another object
 *		Object.create makes linkages
 *		Also created when using the new keyword
 *	3. How does a [[Prototype]] affect an object?
 *		We can call a property or method on an object and if it's not found, it will traverse up
 *		the protoype change to find that property or function reference
 *	4. How do we find out where an object's [[Prototype]] points to (3 ways)?
 *		1. __.proto__
 *		2. Object.getPrototypeOf()
 *		3. .constructor.prototype // hacky!!
 */

/**
 * Inheritance
 * 
 */

/**
 * OO: Classical Inheritance
 *	Copy
 *  Blueprint of class and each new object is a copy of that blueprint
 *
 * OO: Prototypal Inheritance
 *	JS doesn't make copies, it creates links
 *
 * JS doesn't have "Inheritance" is has "Behavior Delegation"
 * Inheritance copies down, prototype delegates up
 */

/**
 * OLOO: Objects Linked to Other Objects
 */

// Before
function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
 	return "I am " + this.me;
};
function Bar(who) {
 	Foo.call(this, who);
}
Bar.prototype = Ojbect.create(Foo.prototype);

Bar.prototype.speak = function() {
	alert("Hello, " + this.identify());
}
var b1 = new Bar("b1");
b1.speak(); // alerts: "Hello, I am b1"

// 1. Remove any "new" keywords
var b1 = new Bar("b1");

// becomes
var b1 = Object.create(Bar.prototype);
Bar.call(b1, "b1");

// 2. Get rid of .prototype references
function Bar(who) {
 	Foo.call(this, who);
}
Bar.prototype = Ojbect.create(Foo.prototype);

// becomes
var Bar = Object.create(Foo.prototype);
Bar.init = function(who) {
	Foo.call(this, who);
};
Bar.speak = function() {
	alert("Hello, " + this.identify());
}
var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();

// 3. Get rid of all ref to .prototype and function foo
function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
 	return "I am " + this.me;
};
var Bar = Object.create(Foo.prototype);
Bar.init = function(who) {
	Foo.call(this, who);
};
Bar.speak = function() {
	alert("Hello, " + this.identify());
}
var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();

// becomes
var Foo = {
	init: function(who) {
		this.me = who;
	},
	identify: function() {
		return "I am " + this.me;
	}
}

var Bar = Object.create(Foo);

Bar.speak = function() {
	alert("Hello, " + this.identify());
};

var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();

/**
 * Quiz
 *	1. How is JS [[Prototype]] chains not like traditional/classical inheritance?
 *		It does not copy, it links
 * 	2. What does "behavior delegation" mean and how does it describe object linking in JS?
 *		Objects delegate up its prototype chain
 *	3. Why is "behavior delegation" as a design pattern a helpful thing? What are the tradeoffs?
 *		With delegation we embrace that all objects exists and are dynamic and chainging at runtime
 *		and the linkage is dynamic and live at runtime.
 *		Classes are snapshot copies. A change parent does not affect the child
 *		Delegation is more poweful than class because you can implment classes in delegation but you 
 *		cannot implement delgation in class mechanism.
 *		Shadowing is awkward
 *		prototype loses encapsultation, becuase everything is public
 */

 // 95% of time Kyle uses module pattern because it's not common to have multiple objects.
 // If you do need multiple objects use delegation