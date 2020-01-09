function foo() {
  throw new Error("Oops!");
  // stack-trace-inf.js:2 Uncaught Error: Oops!
  //   at foo (stack-trace-inf.js:2)
  //   at bar (stack-trace-inf.js:12)
  //   at baz (stack-trace-inf.js:16)
  //   at stack-trace-inf.js:19
}

function bar() {
  foo();
}

function baz() {
  bar();
}

baz();
