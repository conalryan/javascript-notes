# Concurrency

- Multiple parts of a computer program running at the same time.
- If your computer/phone has more than one core (it does) or you have more than one computer (the could does) then this can make things get done much faster.
- However, makes things much more complicated.
- Parallelism is another word for concurrency.

## Threads

- Programs that run on a computer.
- More than one thread can run at a time.
- Single-threaded application has only one thread.

## Web browser

- Traditionaly browsers have only a single thread.
- Main thread: JavaScript runs on main thread.
- Layout, style, recalc, paint, composite, actual physical pixel flip.

## Frames per Second (FPS)

- 60 frames per second is the desired rate at which the browser would like to repaint the screen.
- This means the browser has 16ms to update the screen.
- This also means we need to perform all our operations in 8ms, to give the browser some time (8ms too) to do its work
- Movies traditionally run at 24 frames per second.
- Humans don't necessarily care about the speed (60ms vs 24ms), but they do care about the steadiness/consistency of the frames per second.

## Jank

- Changes in frame rate that disturb the repainting of the screen.
- Human are really good at detecting changes in the frame rate.

## 8ms

- Your code has 8ms of the 16ms to complete in order to maintain a consistent frame rate.
- Example: button click:
  - Event processing
  - Determine new state (perhaps via framework like Angular)
  - State change processing
  - Issue DOM updates
- It's common to exceed your budget, just try not to do it too often.

## Device Performance

- Varies dramatically between mid to high end devices and entry level devices.
- Ares 6 test: Iphone 48 seconds for 6 of 6 passes vs Nokia 2 5min 19s for 1 pass of 6.

## How to Speed up Performance?

## Web Workers

- Been around since 2009.
- Web API provided by browser.
- It's in IE8 +
- A way to do multi-threading in JavaScript in web browsers.
- Workers share no state with each other or the main-thread.
- Workers only have access to a very limited set of web APIs.
- In particular, they do not have access to the DOM.
