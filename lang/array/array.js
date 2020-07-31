let a = [];
console.log(a.length);  // 0

// Arrays can be created using a constructor with a single number parameter. An array with its length property set to that number and the array elements are empty slots.
let A = Array(22);
console.log(A.length);  // 22;

console.log(A[0]);  // undefined
console.log(A[21]);  // undefined