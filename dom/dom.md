# [DOM (Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

- Programming interface for HTML and XML documents.
- It represents the page so that programs can change the document structure, style, and content.
- The DOM represents the document as nodes and objects.
- Programming languages can connect to the page.
- **Web page**
  - Document displayed in the browser window.
  - Document as the HTML source (the same document as displayed in the browser window).
  - The Document Object Model (DOM) represents that same document so it can be manipulated.
  - The DOM is an object-oriented representation of the web page, which can be modified with a scripting language such as JavaScript.
- **Objects**
  - All of the properties, methods, and events available for manipulating and creating web pages are organized into objects.
  - document object that represents the document itself.
  - table object that implements the special HTMLTableElement DOM interface for accessing HTML tables
  - etc.
- DOM is not a programming language, it's an API to manipulate the webpage.
- JavaScript uses the DOM to access the document and its elements.
- The page content is stored in the DOM and may be accessed and manipulated via JavaScript, so that we may write this approximative equation:

API (HTML or XML page) = DOM + JS (scripting language)

- The DOM was designed to be independent of any particular programming language.
- Exposes the structural representation of the document available from a single, consistent API.
- Implementations of the DOM can be built for any language, as this Python example demonstrates:

```python
# Python DOM example
import xml.dom.minidom as m
doc = m.parse(r"C:\Projects\Py\chap1.xml")
doc.nodeName # DOM property of document object
p_list = doc.getElementsByTagName("para")
```

## Browsers

- Different browsers have different implementations of the DOM
- These implementations exhibit varying degrees of conformance to the actual DOM standard
- Every web browser uses some document object model to make web pages accessible via JavaScript.

## Accessing DOM

- document and window objects are accessable inside JavaScript by:
  - Inserting a `<script src="something.js"></script>` tag - By means of a script loading instruction.

## DOM tree

- Contents of a document loaded in browser.
- Includes elements such as `<body>` and `<table>` among many others.

## [DOM Level 1 Core](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Using_the_W3C_DOM_Level_1_Core)

- The W3C's DOM Level 1 Core is a powerful object model for changing the content tree of documents. It is supported in all major browsers including Mozilla Firefox and Microsoft Internet Explorer.
- It is a powerful base for scripting on the web.
- Tree structure
  - HTML, XML, SGML are all tree structures.

```html
<html>
  <head>
    <title>My Document</title>
  </head>
  <body>
    <h1>Header</h1>
    <p>Paragraph</p>
  </body>
</html>
```

```
Document
  HTML
    HEAD
      Title
        My Document
    BODY
      H1
        Header
      P
        Paragraph
```

- Each label above is a **node** in the tree.
- When Mozilla parses a document, it builds a content tree and then uses it to display the document.
- In JavaScript, the document is accessible the same way it has been in older browsers: from the document property of the global object.
- This document object implements the Document interface from the W3C's DOM Level 1 spec.

## Element

- Building block of document object model (DOM) for a given document.

* document = webpage = html source = DOM

## [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

- Connects web pages to scripts or programming languages.
- DOM represents a document with a logical tree.
- Each branch of the tree ends in a node.
- Each node contains objects.
- DOM methods allow programmatic access to the tree.
- DOM methods allow changes to document's strucutre, style and content.
- Nodes can have event handlers attached to them.
- Once an event is triggered, the event handlers get executed.
