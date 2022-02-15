console.log("hi");

setTimeout(function() {
  console.log("there");
}, 5000);

console.log("EOF");

// Log
// hi
// aync-callbacks-inf.js:7 EOF
// aync-callbacks-inf.js:4 there

// Stack
// 1. push (anonymous)
// 2. push console.log('hi')
// 3. pop console.log('hi')
// 4. push setTimeout (setTimeout is a Web API)
// 5. push timer to webapis
// 6. pop setTimeout
// 7. push console.log('EOF')
// 8. pop console.log('EOF')
// 9. pop (anonymous)
// 10. webapi pushes callback function onto task queue aka callback queue
// event loop waits for stack to be empty, then pops first thing off the task queue and pushes it onto the stack.
// 11. push console.log('there')
// 12. pop console.log('there')
