# [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

The JavaScript Array class is a global object that is used in the construction of arrays; which are high-level, list-like objects.

Neither the length of a JavaScript array nor the types of its elements are fixed.

Since an array's length can change at any time, and data can be stored at non-contiguous locations in the array, JavaScript arrays are not guaranteed to be dense; this depends on how the programmer chooses to use them. 

In general, these are convenient characteristics; but if these features are not desirable for your particular use, you might consider using typed arrays.

Arrays cannot use strings as element indexes (as in an associative array) but must use integers. 

In computer science, an associative array, map, symbol table, or dictionary is an abstract data type composed of a collection of (key, value) pairs, such that each possible key appears at most once in the collection.

Create an Array
```javascript
let fruits = ['Apple', 'Banana'] 
console.log(fruits.length) 
// 2
```

Access an Array item using the index position
```javascript
let first = fruits[0] 
// Apple
let last = fruits[fruits.length - 1] 
// Banana
```

Loop over an Array
```javascript
fruits.forEach(function(item, index, array) {   
	console.log(item, index);
}) 
// Apple 0
// Banana 1
```

Add an item to the end of an Array
```javascript
let newLength = fruits.push('Orange') 
// ["Apple", "Banana", "Orange"]
```


Remove an item from the end of an Array
```javascript
let last = fruits.pop() 
// remove Orange (from the end)
// ["Apple", "Banana"]
```

Remove an item from the beginning of an Array
```javascript
let first = fruits.shift() 
// remove Apple from the front
// ["Banana"]
```

Add an item to the beginning of an Array
```javascript
let newLength = fruits.unshift('Strawberry') 
// add to the front
// ["Strawberry", "Banana"]
```

Find the index of an item in the Array
```javascript
fruits.push('Mango') 
// ["Strawberry", "Banana", "Mango"]
let pos = fruits.indexOf('Banana') 
// 1
```

Remove an item by index position
```javascript
let removedItem = fruits.splice(pos, 1) 
// this is how to remove an item                                       
// ["Strawberry", "Mango"]
```

Remove items from an index position
```javascript
let vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];
console.log(vegetables);  
// ["Cabbage", "Turnip", "Radish", "Carrot"] 
let pos = 1;
let n = 2 ;
let removedItems = vegetables.splice(pos, n)
// this is how to remove items, n defines the number of items to be removed, 
// starting at the index position specified by pos and progressing toward the end of array.  console.log(vegetables) 
// ["Cabbage", "Carrot"] (the original array is changed)
 console.log(removedItems) 
// ["Turnip", "Radish"] 
```

Copy an Array
```javascript
let shallowCopy = fruits.slice() 
// this is how to make a copy
// ["Strawberry", "Mango"]
```

Array elements are object properties in the same way that toString is a property (to be specific, however, `toString()` is a method). Nevertheless, trying to access an element of an array as follows throws a syntax error because the property name is not valid:

## Array()
```javascript
[element0, element1, ..., elementN]

new Array(element0, element1[, ...[, elementN]])
new Array(arrayLength)
```