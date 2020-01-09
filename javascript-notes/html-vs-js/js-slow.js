(function IIFE() {
  console.log("executing");
  var newElement = document.createElement("H1");
  var newTextNode = document.createTextNode("JS sure is slow");
  newElement.appendChild(newTextNode);

  var bodyElement = document.getElementsByTagName("BODY");
  bodyElement.item(0).appendChild(newElement);
})();
