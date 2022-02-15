var foo = $.getSync("//foo.com");
var bar = $.getSync("//bar.com");

console.log(foo);
console.log(bar);

// Stack
// Push onto the stack
// 1. (anonymous)
// 2. $.getSynce("//foo.com"); // Blocks everything until it pops off the stack.
// Blocks everything in the browser, the browser can't paint, run any code, nothing.
// Pop off the stack
// 3. $.getSynce("//foo.com");
// Push onto the stack
// 4. $.getSynce("//bar.com"); // Blocks everything until it pops off the stack.
// Pop off the stack
// 5. $.getSynce("//bar.com");
