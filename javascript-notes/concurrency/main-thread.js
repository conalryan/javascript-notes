const worker = new Worker("worker-thread.js");
const inputEl = document.createElement("input");

inputEl.onchange = _ => {
  worker.postMessage({ value: inputEl.value });
  console.log(`value, ${inputEl.value} passed to worker`);
};
document.body.appendChild(inputEl);

worker.onmessage = e => {
  console.log(`result, ${e.data} received from worker thread`);
};
