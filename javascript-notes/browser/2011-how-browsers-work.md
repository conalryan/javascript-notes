# How Browsers Work

2011

https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/

## Goal
- As a web developer, learning the internals of browser operations helps you make better decisions and know the justifications behind development best practices.

## Introduction
- Web browsers are the most widely used software.
- Generally, all browsers, except for the Opera browsers, are based on WebKit (WebKit is an open source rendering engine).

## Browser main functionality
- The main function of a browser is to present the web resource you choose, by requesting it from the server and displaying it in the browser window. 
- The resource is usually an HTML document, but may also be a PDF, image, or some other type of content. 
- The location of the resource is specified by the user using a URI (Uniform Resource Identifier).
- Today most of the browsers conform to the W3C specifications of HTML and CSS files.

## High Level Structure
1. User Interface:
   - Includes address bar, back/forward buttons, bookmarks, menu etc.
   - Every part of the browser display except the window where you see the requested page.
2. Browser engine:
   - Marshals actions between the UI and the rendering engine.
3. Rendering engine:
   - Responsible for displaying requested content.
   - Example: Requested conetent is HTML, rendering engine parses HTML and CSS, and displays the parsed content on the screen.
4. Networking:
   - Networking calls such as HTTP requests.
5. UI backend:
   - Used for drawing basic widgets like combo boxes and windows.
   - Exposes generic interface that is not platform specific.
   - Underneath it uses operating system user interface methods.
6. JavaScript interpreter:
   - Parse and execute JavaScript code.
7. Data storage:
   - Persistance layer.
   - Cookies
   - localStorage
   - IndexedDB
   - WebSQL
   - FileSystem

## Rendering engine
- Displays requested contents on the browser screen.
- Browser runs multiple instances of the rendering engine: one for each tab. Each tab runs in a separate process.
- By default the rendering engine can display HTML and XML documents and images.
- It can display other types of data via plug-ins or extension; for example, displaying PDF documents using a PDF viewer plug-in.
- Tries to display contents on the screen as soon as possible. It will not wait until all HTML is parse before starting to build and layout the render tree.
- Parts of the content will be parsed and displayed, while the process continues with the rest of the contents that keeps coming form the network.

## Main flow
- Rendering engine will start getting contents of the requested document from networking layer usually in 8kB chunks.
1. Parsing HTML to construct the DOM tree.
   - Converts HTML elements to DOM nodes in a tree called the **"content tree"**.
2. Render tree construction
   - Parse style data, both in external CSS files and in style elements.
   - Styling information together with visual instructions in the HTML will be used to create another tree, the **render tree**.
   - Render tree contains rectangles with visual attributes like color and dimensions.
   - Rectangles are in the right order to be displayed on the screen.
3. Layout of the render tree
   - Gives each node the extact coordinates where it should appear on the screen.
4. Painting the render tree
   - Render tree is traversed and each node will be painted using the UI backend layer.

## Parsing
- Translating document to a structure the code can use.
- The result of parsing is usually a tree of nodes that represent the structure of the document.
- Called a **parse tree** or a **syntax tree**.
- Based on syntax rules the document must obey called **grammar**.
- Grammar consist of vocabulary and syntax rules called **context free grammar**.
- Separated into two sub processes:
  1. Lexical analysis:
  - Performed by **lexer** or **tokenizer**.
  - Process of breaking input into tokens.
  - Lexer knows how to strip irrelevant character like white spaces and line breaks.
  - Tokens are the building blocks (like words in a language).
  2. Syntax analysis:
  - Parser is responsible for constructing the **parse tree** by analyzing the document structure according to the language syntax rules.
  - Applying language syntax rules.
- The parsing process is iterative. The parser will usually ask the lexer for a new token and try to match the token with one of the syntax rules. If a rule is matched, a node corresponding to the token will be added to the parse tree and the parser will ask for another token.

## Translation
- Parse tree is not the final product.
- Parsing is often used in translation: transforming the input document to another format.
- An example is compilation. The compiler that compiles source code into machine code first parses it into a parse tree and then translates the tree into a machine code document.

## [Types of parsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Types_of_parsers)
1. Top down
   - Examine high level structure of the syntax and try to find a rule match.
2. Bottom up
   - Start with input and gradually transform it into the syntax rules, startign form the low level rules until high level rules are met.
   - This type of bottom up parser is called a **shift-reduce parser**, because the input is shifted to the right (imagine a pointer pointing first at the input start and moving to the right) and is gradually reduced to syntax rules.

## Parsers
- There are tools that can generate a parser.
- Feed parser grammar of your language (vocabulary and syntax rules).
- **WebKit** uses two well known parser generators: 
  - **Flex** for creating a lexer.
    - Flex input is a file containing regular expression definitions of the tokens.
  - **Bison** for creating a parser (you might run into them with the names Lex and Yacc). 
    - Bison's input is the language syntax rules in BNF format.
    - Bison creates a bottom up **shift-reduce** parser.

### [HTML Parser](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#HTML_Parser)
- The job of the HTML parser is to parse the HTML markup into a parse tree.
- Grammar (vocabulary and syntax-rules) of HTML are defined in specifications created by the W3C organization.
- HTML cannot easily be defined by a context free grammar that parsers need.
- This appears strange at first sight; HTML is rather close to XML. There are lots of available XML parsers. There is an XML variation of HTML–XHTML–so what's the big difference?
- The difference is that the HTML approach is more "forgiving": it lets you omit certain tags (which are then added implicitly), or sometimes omit start or end tags, and so on. On the whole it's a "soft" syntax, as opposed to XML's stiff and demanding syntax.
- HTML is so popular: it forgives your mistakes and makes life easy for the web author. 
- On the other hand, it makes it difficult to write a formal grammar. 
- So to summarize, HTML cannot be parsed easily by conventional parsers, since its grammar is not context free. 
- HTML cannot be parsed by XML parsers.

## [DOM](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#DOM) Parse Tree
- The output tree (the "parse tree") is a tree of DOM element and attribute nodes. DOM is short for Document Object Model. It is the object presentation of the HTML document and the interface of HTML elements to the outside world like JavaScript. 
- The root of the tree is the "Document" object.
- The DOM has an almost one-to-one relation to the markup. For example:
```html
<html>
  <body>
    <p>
      Hello World
    </p>
    <div> <img src="example.png"/></div>
  </body>
</html>
```
- This markup would be translated to the following DOM tree:
```
HTMLElement
- HTMLBodyElement
  - HTMLParagraphElement
    - Text
  - HTMLDivElement
    - HTMLImageElement
```
- When I say the tree contains DOM nodes, I mean the tree is constructed of elements that implement one of the DOM interfaces. Browsers use concrete implementations that have other attributes used by the browser internally.

## [Parsing Algorithm](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_parsing_algorithm)
- As we saw in the previous sections, HTML cannot be parsed using the regular top down or bottom up parsers.
- The reasons are:
  - The forgiving nature of the language.
  - The fact that browsers have traditional error tolerance to support well known cases of invalid HTML.
  - The parsing process is **reentrant**. For other languages, the source doesn't change during parsing, but in HTML, dynamic code (such as script elements containing **document.write()** calls) can add extra tokens, so the parsing process actually modifies the input.
- The algorithm consists of two stages: 
  1. tokenization:
    - Tokenization is the lexical analysis, parsing the input into tokens.
    - Among HTML tokens are start tags, end tags, attribute names and attribute values.
    - The tokenizer recognizes the token, gives it to the tree constructor, and consumes the next character for recognizing the next token, and so on until the end of the input.
  2. tree construction
    - Each node emitted by the tokenizer will be processed by the tree constructor.
    - For each token the specification defines which DOM element is relevant to it and will be created for this token. 
    - The element is added to the DOM tree, and also the stack of open elements. 
    - This stack is used to correct nesting mismatches and unclosed tags.
    - The algorithm is also described as a state machine. 
    - The states are called "insertion modes".
- State machine of parsing:
  - Initial Mode
  - before HTML
  - before HEAD
  - in HEAD
  - after HEAD
  - in BODY
  - after BODY
  - after after BODY
  - EOF token
- At this stage the browser will mark the document as interactive and start parsing scripts that are in **"deferred"** mode: those that should be executed after the document is parsed. The document state will be then set to "complete" and a **"load"** event will be fired.

## [CSS Parsing](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#CSS_parsing)
- Remember the parsing concepts in the introduction? Well, unlike HTML, CSS is a context free grammar and can be parsed using the types of parsers described in the introduction. 
- The lexical grammar (vocabulary) is defined by regular expressions for each token:
  - comment   \/\*[^*]*\*+([^/*][^*]*\*+)*\/
  - num   [0-9]+|[0-9]*"."[0-9]+
  - nonascii  [\200-\377]
  - nmstart   [_a-z]|{nonascii}|{escape}
  - nmchar    [_a-z0-9-]|{nonascii}|{escape}
  - name    {nmchar}+
  - ident   {nmstart}{nmchar}*
- WebKit uses **Flex** and **Bison** parser generators to create parsers automatically from the CSS grammar files.

## Parsing scripts and sytylesheets
- The model of the web is synchronous.
- Scripts are executed immediately when the parser reaches a <script> tag. 
- The parsing of the document halts until the script has been executed. 
- If the script is external then the resource must first be fetched from the network–this is also done synchronously, and parsing halts until the resource is fetched. 
- **"defer"** attribute to a script, in which case it will not halt document parsing and will execute after the document is parsed. 
- HTML5 adds an option to mark the script as **async** so it will be parsed and executed by a different thread.

## [Style sheets](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Style_sheets)
- Style sheets on the other hand have a different model. Conceptually it seems that since style sheets don't change the DOM tree, there is no reason to wait for them and stop the document parsing. There is an issue, though, of scripts asking for style information during the document parsing stage. If the style is not loaded and parsed yet, the script will get wrong answers and apparently this caused lots of problems. It seems to be an edge case but is quite common. Firefox blocks all scripts when there is a style sheet that is still being loaded and parsed. WebKit blocks scripts only when they try to access certain style properties that may be affected by unloaded style sheets.

## [Render tree construction](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Render_tree_construction) Frame Tree
- While the DOM tree is being constructed, the browser constructs another tree, the render tree. This tree is of visual elements in the order in which they will be displayed. It is the visual representation of the document. The purpose of this tree is to enable painting the contents in their correct order.
- The renderers correspond to DOM elements, but the relation is not one to one. Non-visual DOM elements will not be inserted in the render tree. An example is the "head" element. Also elements whose display value was assigned to "none" will not appear in the tree (whereas elements with "hidden" visibility will appear in the tree).
- There are DOM elements which correspond to several visual objects. These are usually elements with complex structure that cannot be described by a single rectangle.
  - For example, the **"select"** element has three renderers: 
    1. Display area
    2. Drop down list box
    3. Button
- In WebKit the process of resolving the style and creating a renderer is called "attachment". Every DOM node has an "attach" method. Attachment is synchronous, node insertion to the DOM tree calls the new node "attach" method.

## [Style Compuation](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Style_Computation)
- Building the render tree requires calculating the visual properties of each render object. This is done by calculating the style properties of each element.
- The style includes style sheets of various origins, inline style elements and visual properties in the HTML (like the "bgcolor" property).The later is translated to matching CSS style properties.
- The origins of style sheets are the browser's default style sheets, the style sheets provided by the page author and user style sheets–these are style sheets provided by the browser user (browsers let you define your favorite styles. In Firefox, for instance, this is done by placing a style sheet in the "Firefox Profile" folder).
- Finding the matching rules for each element can cause performance issues if it's not optimized. Traversing the entire rule list for each element to find matches is a heavy task. Selectors can have complex structure that can cause the matching process to start on a seemingly promising path that is proven to be futile and another path has to be tried.
- For exmample compound selectors:
```css
div div div div {
  // some css rules...
}
```
- In WebKit, who does not have a rule tree, the matched declarations are traversed four times. First non-important high priority properties are applied (properties that should be applied first because others depend on them, such as display), then high priority important, then normal priority non-important, then normal priority important rules. This means that properties that appear multiple times will be resolved according to the correct cascade order. The last wins.
- After parsing the style sheet, the rules are added to one of several hash maps, according to the selector. There are maps by id, by class name, by tag name and a general map for anything that doesn't fit into those categories. If the selector is an id, the rule will be added to the id map, if it's a class it will be added to the class map etc. 
This manipulation makes it much easier to match rules. There is no need to look in every declaration: we can extract the relevant rules for an element from the maps. This optimization eliminates 95+% of the rules, so that they need not even be considered during the matching process.

## [Cascade Order](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Style_sheet_cascade_order)
- This is called the "cascade" order. According to CSS2 spec, the cascade order is (from low to high):
  - Browser declarations
  - User normal declarations
  - Author normal declarations
  - Author important declarations
  - User important declarations

## [Layout](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Layout) (aka Reflow)
- Calculate position and size [of the render tree].
- When the renderer is created and added to the tree, it does not have a position and size. 
- Calculating these values is called layout or reflow.
- HTML uses a **flow** based layout model.
- Usually only a single pass is required to compute the geometry. 
- Elements later ``in the flow'' typically do not affect the geometry of elements that are earlier ``in the flow''
- Layout can proceed left-to-right, top-to-bottom through the document. 
- There are exceptions: for example, HTML tables may require more than one pass.
- The coordinate system is relative to the root frame. Top and left coordinates are used.
- Layout is a recursive process.
- It begins at the root renderer, which corresponds to the <html> element of the HTML document. 
- Layout continues recursively through some or all of the frame hierarchy, computing geometric information for each renderer that requires it.
- The position of the root renderer is 0,0 and its dimensions are the viewport–the visible part of the browser window.
All renderers have a "layout" or "reflow" method, each renderer invokes the layout method of its children that need layout.

## [Dirty Bit System](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Dirty_bit_system)
- In order not to do a full layout for every small change, browsers use a "dirty bit" system. 
- A renderer that is changed or added marks itself and its children as "dirty": needing layout.
- There are two flags: **"dirty"**, and **"children are dirty"** which means that although the renderer itself may be OK, it has at least one child that needs a layout.

## [Global and Incremental Layout](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Global_and_incremental_layout)
- Global:
  - A global style change that affects all renderers, like a font size change.
  - As a result of a screen being resized
- Incremental:
  - Only the dirty renderers will be laid out (this can cause some damage which will require extra layouts). 
  - Triggered (asynchronously) when renderers are dirty. 
  - For example when new renderers are appended to the render tree after extra content came from the network and was added to the DOM tree.

## [Asynchronous and Synchronous layout](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Asynchronous_and_Synchronous_layout)
- Incremental layout is done asynchronously. 
- Firefox queues "reflow commands" for incremental layouts and a scheduler triggers batch execution of these commands. 
- WebKit also has a timer that executes an incremental layout–the tree is traversed and "dirty" renderers are layout out. 
- Scripts asking for style information, like "offsetHeight" can trigger incremental layout synchronously. 
- Global layout will usually be triggered synchronously. 
- Sometimes layout is triggered as a callback after an initial layout because some attributes, like the scrolling position changed.

## [Layout Process](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_layout_process)
1. Parent renderer determines its own width.
2. Parent goes over children and:
   1. Place the child renderer (sets its x and y).
   2. Calls child layout if needed–they are dirty or we are in a global layout, or for some other reason–which calculates the child's height.
3. Parent uses children's accumulative heights and the heights of margins and padding to set its own height–this will be used by the parent renderer's parent.
4. Sets its dirty bit to false.

- Firefox uses a "state" object(nsHTMLReflowState) as a parameter to layout (termed "reflow"). Among others the state includes the parents width. 
The output of the Firefox layout is a "metrics" object(nsHTMLReflowMetrics). It will contain the renderer computed height.

## [Painting](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Painting)
- In the painting stage, the render tree is traversed and the renderer's "paint()" method is called to display content on the screen. 
- Painting uses the UI infrastructure component.

## [Global and Incremental](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Global_and_Incremental)
- Global painting:
  - Like layout, painting the entire tree.
- Incremental painting:
  - Some of the renderers change in a way that does not affect the entire tree. 
  - The changed renderer invalidates its rectangle on the screen. 
  - This causes the OS to see it as a "dirty region" and generate a "paint" event. 
  - The OS does it cleverly and coalesces several regions into one. 
  - In Chrome it is more complicated because the renderer is in a different process then the main process. 
  - The presentation listens to these events and delegates the message to the render root. 
  - The tree is traversed until the relevant renderer is reached. 
  - It will repaint itself (and usually its children).

## [Painting Order](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_painting_order)
- CSS2 defines the order of the painting process. 
- This is actually the order in which the elements are stacked in the stacking contexts. 
- This order affects painting since the stacks are painted from back to front. 
- The stacking order of a block renderer is:
  1. background color
  2. background image
  3. border
  4. children
  5. outline

## WebKit rectangle storage
- Before repainting, WebKit saves the old rectangle as a bitmap. It then paints only the delta between the new and old rectangles. 

## [Minimal Change](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Dynamic_changes)
- The browsers try to do the minimal possible actions in response to a change. 
- Changes to an element's color will cause only repaint of the element. 
- Changes to the element position will cause layout and repaint of the element, its children and possibly siblings. - Adding a DOM node will cause layout and repaint of the node. 
- Major changes, like increasing font size of the "html" element, will cause invalidation of caches, relayout and repaint of the entire tree.

## [Rendering Engine Threads](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_rendering_engines_threads)
- The rendering engine is single threaded. 
- Almost everything, except network operations, happens in a single thread. 
- In Firefox and Safari this is the main thread of the browser. In Chrome it's the tab process main thread. 
- Network operations can be performed by several parallel threads. 
- The number of parallel connections is limited (usually 2–6 connections).

## [Event Loop](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Event_loop)
- The browser main thread is an event loop. It's an infinite loop that keeps the process alive. It waits for events (like layout and paint events) and processes them. 
- This is Firefox code for the main event loop:
```cpp
while (!mExiting)
  NS_ProcessNextEvent(thread);
```

## [Canvas](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_canvas)
- Describes "the space where the formatting structure is rendered": where the browser paints the content. 
- The canvas is infinite for each dimension of the space but browsers choose an initial width based on the dimensions of the viewport.

## [CSS Box Model](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#CSS_Box_model)
- The CSS box model describes the rectangular boxes that are generated for elements in the document tree and laid out according to the visual formatting model. 
- Each box has a content area (e.g. text, an image, etc.) and optional surrounding padding, border, and margin areas.
- Each node generates 0..n such boxes. 
- All elements have a "display" property that determines the type of box that will be generated. Examples:
  - block: generates a block box.
  - inline: generates one or more inline boxes.
  - none: no box is generated.

## [Positiong Scheme](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Positioning_scheme)
- There are three schemes:
  1. Normal: 
    - Object is positioned according to its place in the document. 
    - Place in the render tree is like its place in the DOM tree and laid out according to its box type and dimensions.
  2. Float: 
    - Object is first laid out like normal flow, then moved as far left or right as possible.
  3. Absolute: 
    - Object is put in the render tree in a different place than in the DOM tree.
- The positioning scheme is set by the "position" property and the "float" attribute.
- static and relative cause a normal flow
- absolute and fixed cause absolute positioning
- In static positioning no position is defined and the default positioning is used. 
- In the other schemes, the author specifies the position: top, bottom, left, right.
- The way the box is laid out is determined by:
  - Box type
  - Box dimensions
  - Positioning scheme
  - External information such as image size and the size of the screen

## [Box Types](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Box_types)
- Block box: 
  - forms a block–has its own rectangle in the browser window.
  - Blocks are formatted vertically one after the other
- Inline box:
  - Does not have its own block, but is inside a containing block.
  - Inlines are formatted horizontally.
  - Inline boxes are put inside lines or "line boxes". 
  - The lines are at least as tall as the tallest box but can be taller, when the boxes are aligned "baseline"–meaning the bottom part of an element is aligned at a point of another box other then the bottom. 
  - If the container width is not enough, the inlines will be put on several lines. 
  - This is usually what happens in a paragraph.

## [Positioning](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Positioning)
- Relative:
  - Relative positioning–positioned like usual and then moved by the required delta.
- Floats:
  - A float box is shifted to the left or right of a line. 
  - The interesting feature is that the other boxes flow around it.
- Absolute and Fixed:
  - The layout is defined exactly regardless of the normal flow. 
  - The element does not participate in the normal flow. 
  - The dimensions are relative to the container. 
  - In fixed, the container is the viewport.
  - Note: the fixed box will not move even when the document is scrolled!

## [Layered Representation](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Layered_representation)
- This is specified by the z-index CSS property. It represents the third dimension of the box: its position along the "z axis".

The boxes are divided into stacks (called stacking contexts). In each stack the back elements will be painted first and the forward elements on top, closer to the user. In case of overlap the foremost element will hide the former element. 
The stacks are ordered according to the z-index property. Boxes with "z-index" property form a local stack. The viewport has the outer stack.


