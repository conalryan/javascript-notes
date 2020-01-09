# _javascript_notes
Based off https://github.com/getify/You-Dont-Know-JS

prompt();
easier way to get input for simple learning and demonstration purposes such as what you'll be doing throughout this 
book. Use the prompt(..) function:

age = prompt( "Please tell me your age:" );
console.log( age );

Coerce
In JavaScript this conversion is called "coercion."

JavaScript provides several different facilities for forcibly coercing between types. For example:

var a = "42";
var b = Number( a );

console.log( a );   // "42"
console.log( b );   // 42
Using Number(..) (a built-in function) as shown is an explicit coercion from any other type to the number type. That 
should be pretty straightforward.

But a controversial topic is what happens when you try to compare two values that are not already of the same type, 
which would require implicit coercion.

When comparing the string "99.99" to the number 99.99, most people would agree they are equivalent. But they're not 
exactly the same, are they? It's the same value in two different representations, two different types. You could say 
they're "loosely equal," couldn't you?

To help you out in these common situations, JavaScript will sometimes kick in and implicitly coerce values to the 
matching types.

So if you use the == loose equals operator to make the comparison "99.99" == 99.99, JavaScript will convert the 
left-hand side "99.99" to its number equivalent 99.99. The comparison then becomes 99.99 == 99.99, which is of course 
true.

While designed to help you, implicit coercion can create confusion if you haven't taken the time to learn the rules 
that govern its behavior. Most JS developers never have, so the common feeling is that implicit coercion is confusing 
and harms programs with unexpected bugs, and should thus be avoided. It's even sometimes called a flaw in the design of 
the language.

Coercion comes in two forms in JavaScript: explicit and implicit. Explicit coercion is simply that you can see obviously 
from the code that a conversion from one type to another will occur, whereas implicit coercion is when the type 
conversion can happen as more of a non-obvious side effect of some other operation.

Here's an example of explicit coercion:

var a = "42";
var b = Number( a );

a;              // "42"
b;              // 42 -- the number!

And here's an example of implicit coercion:

var a = "42";
var b = a * 1;  // "42" implicitly coerced to 42 here

a;              // "42"
b;              // 42 -- the number!

Comments
There are lots of opinions on what makes well-commented code; we can't really define absolute universal rules. But some 
observations and guidelines are quite useful:
1. Code without comments is suboptimal.
2. Too many comments (one per line, for example) is probably a sign of poorly written code.
3. Comments should explain why, not what. They can optionally explain how if that's particularly confusing.

Number
console.log( amount.toFixed( 2 ) ); // "215.98"

const
The newest version of JavaScript at the time of this writing (commonly called "ES6") includes a new way to declare 
constants, by using const instead of var:

// as of ES6:
const TAX_RATE = 0.08;
var amount = 99.99;

Truthy/Falsey
JavaScript defines a list of specific values that are considered "falsy" because when coerced to a boolean, they become 
false -- these include values like 0 and "". Any other value not on the "falsy" list is automatically "truthy" -- when 
coerced to a boolean they become true. Truthy values include things like 99.99 and "free". See "Truthy & Falsy" in 
Chapter 2 for more information.

The specific list of "falsy" values in JavaScript is as follows:
* "" (empty string)
* 0, -0, NaN (invalid number)
* null, undefined
* false

Any value that's not on this "falsy" list is "truthy." Here are some examples of those:
* "hello"
* 42
* true
* [ ], [ 1, "2", 3 ] (arrays)
* { }, { a: 42 } (objects)
* function foo() { .. } (functions)

For Loop
The for loop has three clauses: the initialization clause (var i=0), the conditional test clause (i <= 9), and the
update clause (i = i + 1). So if you're going to do counting with your loop iterations, for is a more compact and often 
easier form to understand and write.

Scope
Programming has a term for this concept: scope (technically called lexical scope). In JavaScript, each function gets 
its own scope. Scope is basically a collection of variables as well as the rules for how those variables are accessed 
by name. Only code inside that function can access that function's scoped variables.

Review
some of the essential programming building blocks:

You need operators to perform actions on values.
You need values and types to perform different kinds of actions like math on numbers or output with strings.
You need variables to store data (aka state) during your program's execution.
You need conditionals like if statements to make decisions.
You need loops to repeat tasks until a condition stops being true.
You need functions to organize your code into logical and reusable chunks.
Code comments are one effective way to write more readable code, which makes your program easier to understand, 
maintain, and fix later if there are problems.

Types
The following built-in types are available:
* string
* number
* boolean
* null and undefined
* object
* symbol (new to ES6)

JavaScript provides a typeof operator that can examine a value and tell you what type it is:

var a;
typeof a;               // "undefined"

a = "hello world";
typeof a;               // "string"

a = 42;
typeof a;               // "number"

a = true;
typeof a;               // "boolean"

a = null;
typeof a;               // "object" -- weird, bug

a = undefined;
typeof a;               // "undefined"

a = { b: "c" };
typeof a;               // "object"

The return value from the typeof operator is always one of six (seven as of ES6! - the "symbol" type) string values. 
That is, typeof "abc" returns "string", not string.

Notice how in this snippet the a variable holds every different type of value, and that despite appearances, typeof a 
is not asking for the "type of a", but rather for the "type of the value currently in a." Only values have types in 
JavaScript; variables are just simple containers for those values.

typeof null is an interesting case, because it errantly returns "object", when you'd expect it to return "null".

Warning: This is a long-standing bug in JS, but one that is likely never going to be fixed. Too much code on the Web 
relies on the bug and thus fixing it would cause a lot more bugs!

Also, note a = undefined. We're explicitly setting a to the undefined value, but that is behaviorally no different from 
a variable that has no value set yet, like with the var a; line at the top of the snippet. A variable can get to this 
"undefined" value state in several different ways, including functions that return no values and usage of the void 
operator.

Object
Properties can either be accessed with dot notation (i.e., obj.a) or bracket notation (i.e., obj["a"]). Dot notation is 
shorter and generally easier to read, and is thus preferred when possible.

Bracket notation is useful if you have a property name that has special characters in it, like obj["hello world!"] -- 
such properties are often referred to as keys when accessed via bracket notation. The [ ] notation requires either a 
variable (explained next) or a string literal (which needs to be wrapped in " .. " or ' .. ').

Of course, bracket notation is also useful if you want to access a property/key but the name is stored in another 
variable, such as:

var obj = {
    a: "hello world",
    b: 42
};

var b = "a";

obj[b];         // "hello world"
obj["b"];       // 42

There are a couple of other value types that you will commonly interact with in JavaScript programs: array and function. But rather than being proper built-in types, these should be thought of more like subtypes -- specialized versions of the object type.

Arrays

An array is an object that holds values (of any type) not particularly in named properties/keys, but rather in numerically indexed positions. For example:

var arr = [
    "hello world",
    42,
    true
];

arr[0];         // "hello world"
arr[1];         // 42
arr[2];         // true
arr.length;     // 3

typeof arr;     // "object"

Array
Because arrays are special objects (as typeof implies), they can also have properties, including the automatically 
updated length property.

You theoretically could use an array as a normal object with your own named properties, or you could use an object but 
only give it numeric properties (0, 1, etc.) similar to an array. However, this would generally be considered improper 
usage of the respective types.

The best and most natural approach is to use arrays for numerically positioned values and use objects for named 
properties.

Functions
The other object subtype you'll use all over your JS programs is a function:

function foo() {
    return 42;
}

foo.bar = "hello world";

typeof foo;         // "function"
typeof foo();       // "number"
typeof foo.bar;     // "string"
Again, functions are a subtype of objects -- typeof returns "function", which implies that a function is a main type -- 
and can thus have properties, but you typically will only use function object properties (like foo.bar) in limited cases.

Built-in Methods
When you use a primitive value like "hello world" as an object by referencing a property or method (e.g., 
a.toUpperCase() in the previous snippet), JS automatically "boxes" the value to its object wrapper counterpart (hidden 
under the covers).

A string value can be wrapped by a String object, a number can be wrapped by a Number object, and a boolean can be 
wrapped by a Boolean object. For the most part, you don't need to worry about or directly use these object wrapper 
forms of the values -- prefer the primitive value forms in practically all cases and JavaScript will take care of the 
rest for you.

Equality
The difference between == and === is usually characterized that == checks for value equality and === checks for both 
value and type equality. However, this is inaccurate. The proper way to characterize them is that == checks for value 
equality with coercion allowed, and === checks for value equality without allowing coercion; === is often called 
"strict equality" for this reason.

var a = "42";
var b = 42;

a == b;         // true
a === b;        // false

To boil down a whole lot of details to a few simple takeaways, and help you know whether to use == or === in various 
situations, here are my simple rules:

If either value (aka side) in a comparison could be the true or false value, avoid == and use ===.
If either value in a comparison could be of these specific values (0, "", or [] -- empty array), avoid == and use ===.
In all other cases, you're safe to use ==. Not only is it safe, but in many cases it simplifies your code in a way that 
improves readability.
What these rules boil down to is requiring you to think critically about your code and about what kinds of values can 
come through variables that get compared for equality. If you can be certain about the values, and == is safe, use it! 
If you can't be certain about the values, use ===. It's that simple.

The != non-equality form pairs with ==, and the !== form pairs with ===. All the rules and observations we just 
discussed hold symmetrically for these non-equality comparisons.

You should take special note of the == and === comparison rules if you're comparing two non-primitive values, like 
objects (including function and array). Because those values are actually held by reference, both == and === 
comparisons will simply check whether the references match, not anything about the underlying values.

For example, arrays are by default coerced to strings by simply joining all the values with commas (,) in between. You 
might think that two arrays with the same contents would be == equal, but they're not:

var a = [1,2,3];
var b = [1,2,3];
var c = "1,2,3";

a == c;     // true
b == c;     // true
a == b;     // false

Modules
The most common usage of closure in JavaScript is the module pattern. Modules let you define private implementation 
details (variables, functions) that are hidden from the outside world, as well as a public API that is accessible from 
the outside.

Consider:

function User(){
    var username, password;

    function doLogin(user,pw) {
        username = user;
        password = pw;

        // do the rest of the login work
    }

    var publicAPI = {
        login: doLogin
    };

    return publicAPI;
}

// create a `User` module instance
var fred = User();

fred.login( "fred", "12Battery34!" );
The User() function serves as an outer scope that holds the variables username and password, as well as the inner 
doLogin() function; these are all private inner details of this User module that cannot be accessed from the outside 
world.

Warning: We are not calling new User() here, on purpose, despite the fact that probably seems more common to most 
readers. User() is just a function, not a class to be instantiated, so it's just called normally. Using new would be 
inappropriate and actually waste resources.

Executing User() creates an instance of the User module -- a whole new scope is created, and thus a whole new copy of 
each of these inner variables/functions. We assign this instance to fred. If we run User() again, we'd get a new 
instance entirely separate from fred.

this
If a function has a this reference inside it, that this reference usually points to an object. But which object it 
points to depends on how the function was called.

It's important to realize that this does not refer to the function itself, as is the most common misconception.

Here's a quick illustration:

function foo() {
    console.log( this.bar );
}

var bar = "global";

var obj1 = {
    bar: "obj1",
    foo: foo
};

var obj2 = {
    bar: "obj2"
};

// --------

foo();              // "global"
obj1.foo();         // "obj1"
foo.call( obj2 );   // "obj2"
new foo();          // undefined

There are four rules for how this gets set, and they're shown in those last four lines of that snippet.
1. foo() ends up setting this to the global object in non-strict mode -- in strict mode, this would be undefined and you'd 
get an error in accessing the bar property -- so "global" is the value found for this.bar.
2. obj1.foo() sets this to the obj1 object.
3. foo.call(obj2) sets this to the obj2 object.
4. new foo() sets this to a brand new empty object.

Non-JavaScript
The most common non-JavaScript JavaScript you'll encounter is the DOM API. For example:

var el = document.getElementById( "foo" );

The document variable exists as a global variable when your code is running in a browser. It's not provided by the JS 
engine, nor is it particularly controlled by the JavaScript specification. It takes the form of something that looks an 
awful lot like a normal JS object, but it's not really exactly that. It's a special object, often called a "host object."

Moreover, the getElementById(..) method on document looks like a normal JS function, but it's just a thinly exposed 
interface to a built-in method provided by the DOM from your browser. In some (newer-generation) browsers, this layer 
may also be in JS, but traditionally the DOM and its behavior is implemented in something more like C/C++.

Another example is with input/output (I/O).

Everyone's favorite alert(..) pops up a message box in the user's browser window. alert(..) is provided to your JS 
program by the browser, not by the JS engine itself. The call you make sends the message to the browser internals and 
it handles drawing and displaying the message box.

The same goes with console.log(..); your browser provides such mechanisms and hooks them up to the developer tools.

Unfortunately, the desire to bring class and inheritance design pattern thinking to JavaScript is just about the worst 
thing you could try to do, because while the syntax may trick you into thinking there's something like classes present, 
in fact the prototype mechanism is fundamentally opposite in its behavior.

What's at issue is whether it's better to ignore the mismatch and pretend that what you're implementing is 
"inheritance," or whether it's more appropriate to learn and embrace how the object prototype system actually works. 
The latter is more appropriately named "behavior delegation."


## Object.create vs Object.assign
```typescript
class SimpleObject {
  aString: string;
  aNumber: number;
  aBoolean: boolean;
  anArray: string[];

  constructor(aString: string, aNumber: number, aBoolean: boolean, anArray: (string | string | string)[]) {
    this.aString = aString;
    this.aNumber = aNumber;
    this.aBoolean = aBoolean;
    this.anArray = anArray;
  }
}

let sObj = new SimpleObject('a nice string', 22, true, ['one', 'two']);
let keys = Object.keys(sObj);

let objCreate = Object.create(sObj);
let objCreateKeys = Object.keys(objCreate);
```

The variable sObj is:
sObj = SimpleObject{aString: "a nice string", aNumber: 22, aBoolean: true, anArray: }
  aString = "a nice string"
  aNumber = 22
  aBoolean = true
  anArray = Array(2)
    0 = "one"
    1 = "two"
    length = 2
  __proto__ = Object{constructor: }

The variable keys is:
keys = Arrya(4)
  0 = "aString"
  1 = "aNumber"
  2 = "aBoolean"
  3 = "anArray"
  length = 4

The variable objCreate object is:
objCreate = SimpleObject {}
  _proto_ = SimpleObject{aString: "a nice string", aNumber: 22, aBoolean: true, anArray: }
    aString = "a nice string"
    aNumber = 22
    aBoolean = true
    anArray = Array(2)
      0 = "one"
      1 = "two"
      length = 2
    __proto__ = Object{constructor: }

The variable objCreateKeys is:
objCreateKeys = Array(0)
  length = 0
  __proto__ = Array(0)

The variable objAssign is:
objAssign = Object{aString: "a nice string", aNumber: 22, aBoolean: true, anArray: }
  aBoolean = true
  aNumber = 22
  aString = "a nice string"
  anArray = Array(2)
    0 = "one"
    1 = "two"
    length = 2
  __proto__ = Object{constructor: }

The variable objAssignKeys is:
objAssignKeys = Arrya(4)
  0 = "aString"
  1 = "aNumber"
  2 = "aBoolean"
  3 = "anArray"
  length = 4


typeOf(obj[keys[0]]); // "string"