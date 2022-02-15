# [Shifting into High Gear with Web Workers](https://app.pluralsight.com/library/courses/javascript-web-workers-shifting-into-high-gear/transcript)

## Messages

- postMessage()
  - Main thread can use Worker's postMessage() function to pass data to the worker.
- onmessage
  - Worker will use onmessage event handler to listen for events from the main thread.

## Data Transfer

- Data is copied.

```javascrip
worker.postMessage(someVar);
```

- Data is transferred.
- Technically the ownership is transferred, so the main thread will not have access to the transferred data.
- Only ArrayBuffers and MessagePorts can be transferred.

```javascript
worker.postMessage(someVar, [someVar]);
```

## Message Types

- Primitives
- JSON Objects (or object literal that can easily be serialized to JSON).
- File
- Blob
- ArrayBuffer
- Functions and Object with methods cannot be transferred.

## Worker APIs

- Standard (JSON, setTimeout, etc.)
- WebSockets
- XHR Fetch
- Promise
- IndexDB
- Location (Partial)
- Navigator (Partial)

## Importing Scripts

- Pass comma dimilted list of the files you want to load via relative path.
- importScripts is a synchronous operation.

```javascript
// worker
importScripts("some/path/worker1.js", "somth/other/path/worker2.js");
```

## Worker Types

- Dedicated Workers

  - Single execution context.
  - new up Worker();

  ```javascript
  let worker = new Worker("some/path/worker-ex.js");
  ```

  - close(): Inside worker thread can call close() method to kill the connection.
  - terminate(): Main thread can call worker.terminate() to kill connection.
  - Be careful when terminating, there is no way to prope the worker to see if it's still connected.

- Shared Worker
  ```javascript
  let worker = new SharedWorker("some/path/worker-ex.js");
  ```
  - Multiple execution contexts.
  - iFrames can share the worker.
  - Browser tabs can share the worker.
  - Communicates via 'ports' property.
  - Not as supported as dedicated worker.
  - create -> connect -> startup -> destroy
  - close(): Inside worker thread can call close() method to kill the connection.
  - port.close(): Main thread can call worker.port.close() to kill connection.
