# How Does the Broswer Actually Render a Web Page
https://www.youtube.com/watch?v=SmE4OwHztCc

## Components
- Bindings
- Rendering: Parsing, layout, painting etc.
- Platform
- JavaScript VM

## High Level View
- Parse HTML -> DOM tree (Content tree) \
                                          -> Render tree (Frame tree) -> Layout (Reflow) -> Paint
- Parse CSS  -> CSSOM tree              /

## Parsing
- HTML is forgiving
Valid HTML5
```html
<body>
<p class=wat>My first website
<div><span>Visitor count: 0
```
becomes
```html
<html>
  <head></head>
  <body>
    <p class="wat">
      My first website
    </p>
    <div>
      <span>
        Visitor count: 0
      </span>
    </div>
  </body>
</html>
```
- Can be halted
  - <script>, <link> & <style>
  - Stops parsing and executes script because it can change the DOM.
  - Put your scripts at bottom of page, that way the browser can go through your page uninterrupted.
  - Use **defer**: Wait till browser is done parsing.
  - Use **async**: Browser will parse and execute script in new thread.
- Speculative parsing
- It's reentrant
  - It can be interrupted.
- Flow:
  - Tokenizer -> Tree construction (aka Parse Tree) -> DOM tree -> JS interacts with DOM tree (document.write) kicks off tokenizer again.

## Parse Tree
- One to One relationship with HTML.
```
html
|-- head
`-- body
    |-- p.wat
    |   `-- #text
    `-- div
        `-- span
            `-- #text
```

## Dom Tree
- Created from Parse Tree
```
HTMLHtmlElement
|-- HTMLHeadElement
`-- HTMLBodyElement
    |-- HTMLParagraphElement
    |   `-- Text
    `-- HTMLDivElement
        `-- HTMLSpanElement
            `-- Text
```

## CSSOM CSS Object Model
- CSS is parsed to create a CSSOM.
- Similar to DOM except with CSS.

## Render/Frame Tree
- Combine DOM + CSSOM.
- Style resolution
- Actual representation of what will show on screen.
- Not a One-to-One mapping of your HTML.
- Multiple trees:
  - RenderObjects
  - RenderStyles
  - RenderLayers
  - Line boxes
- Not in render tree:
  - Non-visual elements head, script, title etc
  - Nodes hidden via display: none;

## Layout (aka Reflow)
- Traverse render tree.
- Nodes position and size.
- Layout its children.
- Recursive so layouts children first.
- Broswer will batch layouts, Render tree items will falg themselves as dirty.
- Asynchronous
- **Immeditate layout**:
  - Doing a font-size change.
  - Resize the browser window.
  - Accessing certian properties via JavaScript (e.g. node.offsetHeight), browser needs to layout everything to give you the offset.
- Performance tip:
  - Act like the browser and batch your DOM changes.
  - Do all your reads in one pass.
  - Followed by writes
  - Bad: Read write read write
  ```javascript
  var divHeight = div.clientWidth / 1.7;
  div.style.height = divHEight + 'px';

  var div2Height = div2.clientWidth / 1.7;
  div2.sylte.height = div2Height + 'px';
  ```
  - Good: reads first, then writes
  ```javascript
  var divHeight = div.clientWidth / 1.7;
  var div2Height = div2.clientWidth / 1.7;

  div.style.height = divHEight + 'px';
  div2.sylte.height = div2Height + 'px';
  ```

## Paint
- Takes render tree that has been layed out and paints.
- Creates layers
- Incremental process
- Build up over 12 phases
- Produces a bitmap from each layer
- Bitmap is uploaded to the GPU as a texture
- Composites the textures into a final image to render to the screen
- Permance tip:
  - Inline critical CSS via a style tag in the <head>
  - The most important bits of you site/app
  - Sppeds up first paint times