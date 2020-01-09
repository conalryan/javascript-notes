function change() {
  // Get Elements by Tag Name
  // document.getElementByTagName("some_html_tag");
  // e.g. document.getElementsByTagName("H2") returns a NodeList of the <h2> elements in the document.
  var htTags = document.getElementsByTagName("H2");
  var h2Tag = htTags.item(0);

  // First Child property
  // the firstChild of the header is a Text node:
  h2Tag.firstChild.data = "A dynamic document"; // Header now displays "A dynamic document" to the user.

  var pTag = document.getElementsByTagName("P").item(0);
  pTag.firstChild.data = "This is the first paragraph.";

  // create a new Element ("P") to be the second paragraph
  var newElement = document.createElement("P");

  // create a new Text node for the second paragraph
  var newTextNode = document.createTextNode("This is the second paragraph.");

  // put the text in the paragraph
  newElement.appendChild(newTextNode);

  // and put the paragraph on the end of the document by appending it to the BODY (which is the parent of the pTag)
  pTag.parentNode.appendChild(newElement);
}
