# [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

- Enable a script to run operations in a background thread separate from the main execution thread of a web application.
- Laborious processing can be performed in a separate thread, allowing the main (usually the UI) thread to run without being blocked/slowed down.

## [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker)

```javascript
var myWorker = new Worker(aURL, options);
```

- aURL
  - A USVString representing the URL of the script the worker will execute. It must obey the same-origin policy.
- options (Optional)
  - type:
    - A DOMString specifying the type of worker to create. The value can be classic or module. If not specified, the default used is classic.
  - credentials:
    - A DOMString specifying the type of credentials to use for the worker. The value can be omit, same-origin, or include. If not specified, or if type is classic, the default used is omit (no credentials required).
  - name:
    - A DOMString specifying an identifying name for the DedicatedWorkerGlobalScope representing the **scope** of the worker, which is mainly useful for debugging purposes.
- Object created via Worker() constructor.
- Takes a URL of a JavaScript file that is to be run in the worker thread.
- Script must obey the same-origin policy.
- Start up cost to a web worker, so you want it's life to be long lived.
- Workers run in a separate global context than the current window.
- This context is represented by: - [DedicatedWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope) object (in the case of dedicated workers, workers that are utilized by a single script).
- [SharedWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope) (in the case of shared workers - workers that are shared between multiple scripts).
- CANNOT
  - Manipulate DOM in worker.
  - Call some default methods and access properties of the window object.
- CAN
  - Use a large number of window method/properties including:
  - [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).
  - [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
  - [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) for network I/O, with the exception that the responseXML and channel attributes on XMLHttpRequest always return null.

## Data Transfer

- postMessage()
  - Data sent betwwen worker and main thread via postMessage() method.
  - Data is copied rather than shared.
- onmessage
  - Event handler to respond to messages between threads.
  - Message is contianed within the MEssage event's **data** property.
  - Data is copied rather than shared.

## Worker Types

- [Shared workers](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)
  - Utilized by multiple scripts running in different windows, IFrames, etc., as long as they are in the same domain as the worker.
  - More complex than dedicated workers — scripts must communicate via an active port.
- [ServiceWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
  - Act as proxy servers that sit between web applications, the browser, and the network (when available).
  - They are intended, among other things, to enable the creation of effective offline experiences, intercept network requests and take appropriate action based on whether the network is available, and update assets residing on the server.
  - They will also allow access to **push notifications** and background sync APIs.
- [Chrome Workers](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko/Chrome/API/ChromeWorker)
  - Firefox-only type of worker that you can use if you are developing add-ons and want to use workers in extensions and have access to js-ctypes in your worker.
- [Audio Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#Audio_Workers)
  - Provide the ability for direct scripted audio processing to be done inside a web worker context.
