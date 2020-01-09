function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  var squared = square(n);
  console.warn(squared);
}

printSquare(4);

// stack
// Push onto stack:
// 1. (anonymous)
// 2. printSquare
// 3. square
// 4. multiply
// Pop off stock
// 5. return multiply
// 6. return square
// Push onto stack
// 7. console.log
// Pop off stack
// 8. return console.log
// 9. return printSquare
// 1o. return call-stack-inf.js
