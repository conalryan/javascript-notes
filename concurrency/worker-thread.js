self.onmessage = e => {
  console.log(`value, ${e.data} received from main thread`);
  const result = `Result: ${e.data.value}`;
  console.log(`result, ${result} passed to main thread`);
  postMessage(result);
};
