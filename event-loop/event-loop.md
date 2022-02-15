# Event Loop

https://www.youtube.com/watch?v=8aGhZQkoFbQ&index=2&t=20s&list=WL
https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html

## JavaScript

- I'm a single threaded non-blocking asynchronous concurrent language.
- Has call stack, event lopp, callback queue and some other apis.

## V8

## Browser

- V8
  - JavaScript engine
  - Heap
    - Memory allocation
  - Stack
    - Execution contexts
    - Stack frames
    - Interacts with Web APIs provided by browser
- Web APIs provided by browser
  - DOM (document)
  - ajax (XMLHttpRequest)
  - setTimeout
- Event loop
- Call back queue
  - onClick, onLoad, onDone

## Call stack

- One thread == one call stack == one thing at a time.
- Data structure that keeps track of where we are in the program.
- Step into function we push onto the call stack.
- Return from a function we pop off the call stack.

## Blocking

- Things that are slow
  - Image processing is slow.
  - Network requests are slow.
  - While loop from 1 to a billion is slow.

## Asynchronous callbacks

- Solution to blocking

## Concurrency & the Event Loop

- JavaScript run time can only do one thing at a time.
- However, browser can do multiply things at a time.
- Essentially Web APIs are like threads that you can access and make calls to.
- Node.js has similar pattern except instead of Web APIs provided by a browser, they are c++ APIs.

## Event Loop

- Looks at stack and looks at task queue.
- When stack is empty, event loop pops first thing off the task queue and pushes it onto the stack.
- That's all it does.

## setTimeout 0

```javascript
setTimeout(function cb() {
  console.log("there");
}, 0);
```

- Above will defer the execution until the stack is cleared.
- setTimeout is not a guarantee to run your code in n time, it's the minimum time for it to run. It's the time when it will be pushed onto the task queue, from there you have to wait for any other functions ahead of you in the task queue and the stack to be clear.

## Render Queue

- Browser wants to repaint every 16.6ms (or 60 frames a second).
- Render queue has to wait for call stack to be cleared.
- Browser is constrained to repaint by your code in the stack.
- Render takes precedence over your callback queue.
- Every 16ms browser will queue a render, then waits for stack to clear, then runs.
- If render is blocked, user can't interact with screen.
- Don't block the call stack, i.e. don't put shitty slow code on the stack and block the browser from doing what it wants to do.

## Scroll events

- Scroll events are triggered a lot.
- This means a lot of callback functions will be added to the task queue then need to wait for the stack to clear be popped off the task queue onto the call stack, run and pop off the stack.
