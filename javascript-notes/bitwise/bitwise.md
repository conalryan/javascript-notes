# [Bitwise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

## Signed 32-bit integers

The operands of all bitwise operators are converted to signed 32-bit integers in two's complement format, except for zero-fill right shift which results in an unsigned 32-bit integer.
Two's complement format means that a number's negative counterpart (e.g. 5 vs. -5) is all the number's bits inverted (bitwise NOT of the number, a.k.a. ones' complement of the number) plus one.

```javascript
var a = 1; // 1
var b = 2; // 10
var c = 4; // 100
```

## [Masking bits to 1](https://en.wikipedia.org/wiki/Mask_(computing))

To turn certain bits on, the bitwise OR operation can be used, following the principle that `Y OR 1 = 1` and `Y OR 0 = Y`.
Therefore, to make sure a bit is on, OR can be used with a 1.
To leave a bit unchanged, OR is used with a 0.

```javascript
// init to 0, OR bit 2s complement (1, 2, 4, 8, etc)
a = 0 | 1; // 1
b = 0 | 2; // 10
c = 0 | 4; // 100

// init to 0, OR one, in the Nth bit position
a = 0 | 1 << 0; // 1
b = 0 | 1 << 1; // 10
c = 0 | 1 << 2; // 100
d = 0 | 1 << 3; // 1000

const setBit = (n, bitIndex) => {
  const bitMask = 1 << bitIndex;
  return n | bitMask;
}

e = 2; // 10
d = setBit(e, 1); // 11
```

## Masking bits to 0

More often in practice bits are "masked off" (or masked to 0) than "masked on" (or masked to 1).
When a bit is ANDed with a 0, the result is always 0, i.e. Y AND 0 = 0.
To leave the other bits as they were originally, they can be ANDed with 1, since Y AND 1 = Y.

```javascript
a = 0 & 0; // 0
a = 0 & 1; // 0
a = 1 & 0; // 0
a = 1 & 1; // 1

a = 3; // 11
b = a & 1; // 1
b = a & 2; // 10
b = a & 4; // 0

a = 7; // 111
b = a & 1; // 1
b = a & 2; // 10
b = a & 4; // 100

a = 7; // 111
b = a & 1 << 0; // 1
b = a & 1 << 1; // 10
b = a & 1 << 2; // 100
b = a & 1 << 3; // 0
```

## Querying the status of a bit

It is possible to use bitmasks to easily check the state of individual bits regardless of the other bits.
To do this, turning off all the other bits using the bitwise AND is done as discussed above and the value is compared with 1.
If it is equal to 0, then the bit was off, but if the value is any other value, then the bit was on.
What makes this convenient is that it is not necessary to figure out what the value actually is, just that it is not 0.

```javascript
a = 7; // 111
if (a & 1 << 2) {
  console.log('3rd bit is set');
}

if ((a & 1 << 3) === 0) {
  console.log('4th bit is not set');
}

const getBit = (n, bitIndex) => {
  const bitMask = 1 << bitIndex;
  const result = n & bitMask;
  return result >>> bitIndex;
}

a = 2; // 10
b = getBit(a, 1); // 1
c = getBit(a, 0); // 0
```

## [Clearing a specific bit](https://lucasfcosta.com/2018/12/25/bitwise-operations.html)
1. Create a mask with `1` in the index you want to clear
```javascript
const bit = 3; // 11
// BitMask for 2nd bit (0 indexed)
const bitMask = 1 << 1; // 10
```

2. Invert the mask using `NOT`
```javascript
const invertedBitMask = ~bitMask; // -11
```

3. Perform an AND. This will make all the bits remain the same, except for the one in the same position as the 0 in the mask, since that will turn any bit to 0.
```javascript
const cleared = bit & invertedBitMask; // 1
```

```javascript
const clearBit = (n, bitIndex) => {
    const bitMask = ~(1 << bitIndex);
    return n & bitMask;
}

const a = 3;
console.log(a.toString(2)); // 11
const cleared = clearBit(a, 1); // 1
```

## Binary
Each placeholder can hold 2 - 1 (i.e. 0, 1);

0001 = 1
0010 = 2
0011 = 3
0100 = 4

## Decimal
Each placeholder can hold 10 - 1 (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

## [Hexadecimal](https://lucasfcosta.com/2018/12/25/bitwise-operations.html)
Each placeholder can hold 16 - 1 (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F)
Where A is 10, B is 11, C is 12, D is 13, E is 14, F is 15

The bigger your base, the more compact the representation. 
This means that representing a number using hexadecimals takes a lot less space than representing it in binary.

For hexadecimals, we start our representation with `0x`
For octals, we start our representation with `0o`
For binaries, we start our representation with `0b`
