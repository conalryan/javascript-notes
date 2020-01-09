# Browser

## High Level Structure
- User Interface
  - URL bar, back button, everything user interfacts with.
  - Includes address bar, back/forward buttons, bookmarks, menu etc.
 - Every part of the browser display except the window where you see the requested page.
- Browser Engine
  - Acts as middleman between User Interface and Rendering Engine.
  - Marshals actions between the UI and the rendering engine.
- Rendering Engine
  - Parses HTML
  - Parses CSS
  - Parses JavaScript
  - Layouts Render Tree
  - Paints
- Newtworking
  - Networking calls such as HTTP requests.
- Javascript Interpreter
  - Parse and execute JavaScript code.
- UI Backend
  - Building basic widgets
  - Used for drawing basic widgets like combo boxes and windows.
  - Exposes generic interface that is not platform specific.
  - Underneath it uses operating system user interface methods.
- Data Persistence
  - Cookies
  - LocalStorage
  - Persistance layer.
  - Cookies
  - localStorage
  - IndexedDB
  - WebSQL
  - FileSystem

## Rendering Engine
- Rendering engine receives contents of the requested document from networking layer usually in 8kB chunks.
- Browser runs multiple instances of the rendering engine: one for each tab. Each tab runs in a separate process.
- By default the rendering engine can display HTML and XML documents and images.
- It can display other types of data via plug-ins or extension; for example, displaying PDF documents using a PDF viewer plug-in.
- Tries to display contents on the screen as soon as possible. It will not wait until all HTML is parse before starting to build and layout the render tree.
- Parts of the content will be parsed and displayed, while the process continues with the rest of the contents that keeps coming form the network.

### High Level View
- Parse HTML -> DOM tree (Content tree)   \
                                           -> Render tree (Frame tree) -> Layout (Reflow) -> Paint
- Parse CSS -> CSSOM tree (Compute style) /

### Parse
- Parse HTML:
  - Converts HTML elements to DOM nodes in a tree called the **DOM Tree** or **Content Tree**.
  - HTML is forgiving (or the HTML parsers are forgiving)
  ```html
  <!-- This is still valid HTML5 -->
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
  - The algorithm consists of two stages: 
    1. Tokenization:
      - Tokenization is the lexical analysis, parsing the input into tokens.
      - Result of tokenization is the **parse tree**
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
    2. Tree construction
      - Each node emitted by the tokenizer will be processed by the tree constructor.
      - For each token the specification defines which DOM element is relevant to it and will be created for this token.
      - The root of the tree is the "Document" object.
      - Result of tree construction is **DOM tree* 
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


  ## Parsing

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

## CSSOM CSS Object Model
- CSS is parsed to create a CSSOM.
- Similar to DOM except with CSS.


## Parsing scripts and sytylesheets
- The model of the web is synchronous.
- Scripts are executed immediately when the parser reaches a <script> tag. 
- The parsing of the document halts until the script has been executed. 
- If the script is external then the resource must first be fetched from the network–this is also done synchronously, and parsing halts until the resource is fetched. 
- **"defer"** attribute to a script, in which case it will not halt document parsing and will execute after the document is parsed. 
- HTML5 adds an option to mark the script as **async** so it will be parsed and executed by a different thread.

## [Style sheets](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Style_sheets)
- Style sheets on the other hand have a different model. Conceptually it seems that since style sheets don't change the DOM tree, there is no reason to wait for them and stop the document parsing. There is an issue, though, of scripts asking for style information during the document parsing stage. If the style is not loaded and parsed yet, the script will get wrong answers and apparently this caused lots of problems. It seems to be an edge case but is quite common. Firefox blocks all scripts when there is a style sheet that is still being loaded and parsed. WebKit blocks scripts only when they try to access certain style properties that may be affected by unloaded style sheets.

## CSSOM CSS Object Model
- CSS is parsed to create a CSSOM.
- Similar to DOM except with CSS.



- Parse
  - Scripts block!
  - Use async and defer tags in the script.
  - Put your script blocks at the bottom of the page.
  - What Blocks Parsing?
    - DNS lookup
    - JavaScript parsring & compilation
    - JavaScript downloads
    - Synchronous XHRs
    - Event Handler Dispatch
    - Style readback - realtime calculation (width of element etc, offset width etc.)
  




### Render Tree
1. Render tree construction
   - Parse style data, both in external CSS files and in style elements.
   - Styling information together with visual instructions in the HTML will be used to create another tree, the **render tree**.
   - Render tree contains rectangles with visual attributes like color and dimensions.
   - Rectangles are in the right order to be displayed on the screen.
- Render
  - Result of all CSS calculations.
  - Font sizes, border sizes, padding sizes, margin sizes etc.

  - Responsible for displaying requested content.
  - Example: Requested conetent is HTML, rendering engine parses HTML and CSS, and displays the parsed content on the screen.




### Layout
1. Layout of the render tree
   - Gives each node the extact coordinates where it should appear on the screen.
- Layout
  - Uses DOM tree and CSS application.
  - CSS actual works bottom up with executed by browser. Browser looks at the rules on this element and the looks at each parent to see what other rules need to be applied.
  - This means the more specific you are the faster the browser can execute the rule. Meaning #some-id will execute faster.
  - Deep DOMS and lots of CSS rules/generic the CSS rule selector can slow the layout process. 




### Paint
3. Painting the render tree
   - Render tree is traversed and each node will be painted using the UI backend layer.
