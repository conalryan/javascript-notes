# Run

- Necessary to run via webserver otherwise browser will error:
  Uncaught DOMException: Failed to construct 'Worker': Script at 'file:///Users/cryan/Development/github/conalryan/inf-javascript/concurrency/worker-thread-inf.js' cannot be accessed from origin 'null'.
  at file:///Users/cryan/Development/github/conalryan/inf-javascript/concurrency/main-thread-inf.js:1:16

```bash
npm install -g local-web-server
cd ./concurrency
ws
```

- Open browser to localhost:8000
- Type in input elemnt to see console logs between threads.
