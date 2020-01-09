function foo() {
  return foo();
  // Uncaught RangeError: Maximum call stack size exceeded
  //   at foo (blow-stack-inf.js:1)
  //   at foo (blow-stack-inf.js:2)
  //   at foo (blow-stack-inf.js:2)
  //   at foo (blow-stack-inf.js:2)
  //   at foo (blow-stack-inf.js:2)
  //   at foo (blow-stack-inf.js:2)
  //   at foo (blow-stack-inf.js:2)
  //   at foo (blow-stack-inf.js:2)
  //   at foo (blow-stack-inf.js:2)
  //   at foo (blow-stack-inf.js:2)
}

foo();

// Or as a one liner
(function a() {
  return a();
})();
// VM292:1 Uncaught RangeError: Maximum call stack size exceeded
//     at a (<anonymous>:1:1)
//     at a (<anonymous>:1:23)
//     at a (<anonymous>:1:23)
//     at a (<anonymous>:1:23)
//     at a (<anonymous>:1:23)
//     at a (<anonymous>:1:23)
//     at a (<anonymous>:1:23)
//     at a (<anonymous>:1:23)
//     at a (<anonymous>:1:23)
//     at a (<anonymous>:1:23)
