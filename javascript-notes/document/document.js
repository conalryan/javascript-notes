/* <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>document-inf</title>
  </head>
  <body>
    <h1>Document Inf</h1>
    <script src="document-inf.js"></script>
  </body>
</html> */

var d = document; // HTMLDocument;
console.warn(d.toString()); // "[object, HTMLDocument]"

d.newProp = "New prop";
console.warn(d.newProp); // New prop

/* URL: "file:///Users/cryan/Development/github/conalryan/inf-javascript/document-inf/index.html"
activeElement: body
alinkColor: ""
all: HTMLAllCollection(7) [html, head, meta, title, body, h1, script]
anchors: HTMLCollection []
applets: HTMLCollection []
baseURI: "file:///Users/cryan/Development/github/conalryan/inf-javascript/document-inf/index.html"
bgColor: ""
body: body
characterSet: "UTF-8"
charset: "UTF-8"
childElementCount: 1
childNodes: NodeList(2) [<!DOCTYPE html>, html]
children: HTMLCollection [html]
compatMode: "CSS1Compat"
contentType: "text/html"
cookie: ""
currentScript: script
defaultView: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
designMode: "off"
dir: ""
doctype: <!DOCTYPE html>
documentElement: html
documentURI: "file:///Users/cryan/Development/github/conalryan/inf-javascript/document-inf/index.html"
domain: ""
embeds: HTMLCollection []
fgColor: ""
firstChild: <!DOCTYPE html>
firstElementChild: html
accessKey: ""
assignedSlot: null
attributeStyleMap: StylePropertyMap {size: 0}
attributes: NamedNodeMap {0: lang, lang: lang, length: 1}
autocapitalize: ""
baseURI: "file:///Users/cryan/Development/github/conalryan/inf-javascript/document-inf/index.html"
childElementCount: 2
childNodes: NodeList(3) [head, text, body]
children: HTMLCollection(2) [head, body]
classList: DOMTokenList [value: ""]
className: ""
clientHeight: 690
clientLeft: 0
clientTop: 0
clientWidth: 1280
contentEditable: "inherit"
dataset: DOMStringMap {}
dir: ""
draggable: false
firstChild: head
firstElementChild: head
hidden: false
id: ""
innerHTML: "<head>↵    <meta charset="utf-8">↵    <title>document-inf</title>↵  </head>↵  <body>↵    <h1>Document Inf</h1>↵    <script src="document-inf.js"></script></body>"
innerText: "Document Inf"
inputMode: ""
isConnected: true
isContentEditable: false
lang: "en"
lastChild: body
lastElementChild: body
localName: "html"
namespaceURI: "http://www.w3.org/1999/xhtml"
nextElementSibling: null
nextSibling: null
nodeName: "HTML"
nodeType: 1
nodeValue: null
nonce: ""
offsetHeight: 80
offsetLeft: 0
offsetParent: null
offsetTop: 0
offsetWidth: 1280
onabort: null
onauxclick: null
onbeforecopy: null
onbeforecut: null
onbeforepaste: null
onblur: null
oncancel: null
oncanplay: null
oncanplaythrough: null
onchange: null
onclick: null
onclose: null
oncontextmenu: null
oncopy: null
oncuechange: null
oncut: null
ondblclick: null
ondrag: null
ondragend: null
ondragenter: null
ondragleave: null
ondragover: null
ondragstart: null
ondrop: null
ondurationchange: null
onemptied: null
onended: null
onerror: null
onfocus: null
ongotpointercapture: null
oninput: null
oninvalid: null
onkeydown: null
onkeypress: null
onkeyup: null
onload: null
onloadeddata: null
onloadedmetadata: null
onloadstart: null
onlostpointercapture: null
onmousedown: null
onmouseenter: null
onmouseleave: null
onmousemove: null
onmouseout: null
onmouseover: null
onmouseup: null
onmousewheel: null
onpaste: null
onpause: null
onplay: null
onplaying: null
onpointercancel: null
onpointerdown: null
onpointerenter: null
onpointerleave: null
onpointermove: null
onpointerout: null
onpointerover: null
onpointerup: null
onprogress: null
onratechange: null
onreset: null
onresize: null
onscroll: null
onsearch: null
onseeked: null
onseeking: null
onselect: null
onselectstart: null
onstalled: null
onsubmit: null
onsuspend: null
ontimeupdate: null
ontoggle: null
onvolumechange: null
onwaiting: null
onwebkitfullscreenchange: null
onwebkitfullscreenerror: null
onwheel: null
outerHTML: "<html lang="en"><head>↵    <meta charset="utf-8">↵    <title>document-inf</title>↵  </head>↵  <body>↵    <h1>Document Inf</h1>↵    <script src="document-inf.js"></script></body></html>"
outerText: "Document Inf"
ownerDocument: document
parentElement: null
parentNode: document
prefix: null
previousElementSibling: null
previousSibling: <!DOCTYPE html>
scrollHeight: 690
scrollLeft: 0
scrollTop: 0
scrollWidth: 1280
shadowRoot: null
slot: ""
spellcheck: true
style: CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}
tabIndex: -1
tagName: "HTML"
textContent: "↵    ↵    document-inf↵  ↵  ↵    Document Inf↵    "
title: ""
translate: true
version: ""
__proto__: HTMLHtmlElement
fonts: FontFaceSet {onloading: null, onloadingdone: null, onloadingerror: null, ready: Promise, status: "loaded", …}
forms: HTMLCollection []
head: head
hidden: true
images: HTMLCollection []
implementation: DOMImplementation {}
inputEncoding: "UTF-8"
isConnected: true
lastChild: html
lastElementChild: html
lastModified: "11/17/2018 22:11:44"
linkColor: ""
links: HTMLCollection []
location: Location {replace: ƒ, assign: ƒ, href: "file:///Users/cryan/Development/github/conalryan/inf-javascript/document-inf/index.html", ancestorOrigins: DOMStringList, origin: "file://", …}
nextSibling: null
nodeName: "#document"
nodeType: 9
nodeValue: null
onabort: null
onauxclick: null
onbeforecopy: null
onbeforecut: null
onbeforepaste: null
onblur: null
oncancel: null
oncanplay: null
oncanplaythrough: null
onchange: null
onclick: null
onclose: null
oncontextmenu: null
oncopy: null
oncuechange: null
oncut: null
ondblclick: null
ondrag: null
ondragend: null
ondragenter: null
ondragleave: null
ondragover: null
ondragstart: null
ondrop: null
ondurationchange: null
onemptied: null
onended: null
onerror: null
onfocus: null
onfreeze: null
ongotpointercapture: null
oninput: null
oninvalid: null
onkeydown: null
onkeypress: null
onkeyup: null
onload: null
onloadeddata: null
onloadedmetadata: null
onloadstart: null
onlostpointercapture: null
onmousedown: null
onmouseenter: null
onmouseleave: null
onmousemove: null
onmouseout: null
onmouseover: null
onmouseup: null
onmousewheel: null
onpaste: null
onpause: null
onplay: null
onplaying: null
onpointercancel: null
onpointerdown: null
onpointerenter: null
onpointerleave: null
onpointerlockchange: null
onpointerlockerror: null
onpointermove: null
onpointerout: null
onpointerover: null
onpointerup: null
onprogress: null
onratechange: null
onreadystatechange: null
onreset: null
onresize: null
onresume: null
onscroll: null
onsearch: null
onseeked: null
onseeking: null
onselect: null
onselectionchange: null
onselectstart: null
onstalled: null
onsubmit: null
onsuspend: null
ontimeupdate: null
ontoggle: null
onvisibilitychange: null
onvolumechange: null
onwaiting: null
onwebkitfullscreenchange: null
onwebkitfullscreenerror: null
onwheel: null
origin: "null"
ownerDocument: null
parentElement: null
parentNode: null
pictureInPictureElement: null
pictureInPictureEnabled: true
plugins: HTMLCollection []
pointerLockElement: null
previousSibling: null
readyState: "loading"
referrer: ""
rootElement: null
scripts: HTMLCollection [script]
scrollingElement: html
styleSheets: StyleSheetList {length: 0}
textContent: null
title: "document-inf"
visibilityState: "hidden"
vlinkColor: ""
wasDiscarded: false
webkitCurrentFullScreenElement: null
webkitFullscreenElement: null
webkitFullscreenEnabled: true
webkitHidden: true
webkitIsFullScreen: false
webkitVisibilityState: "hidden"
xmlEncoding: null
xmlStandalone: false
xmlVersion: null
__proto__: HTMLDocument */
