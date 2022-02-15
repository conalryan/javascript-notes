# How Browsers Work
https://www.youtube.com/watch?v=0IsQqJ7pwhw&t=398s

## Broswer components
- User Interface
  - URL bar, back button, everything user interfacts with.
- Browser Engine
  - Acts as middleman between User Interface and Rendering Engine.
- Rendering Engine
  - Parses HTML, CSS and JavaScript.
  - Paints.
- Newtworking
  - http requests
- Javascript Interpreter
- UI Backend
    - Building basic widgets
- Data Persistence
  - Cookies
  - LocalStorage

### Rendering Engine
- Parsing
  - Two types:
    - CSS and JavaScript parser
    - HTML parser
      - DOM tree
  - Grammar: Used to parse document.
    - Vocabulary
    - Syntax Rules
  - Steps
    - Lexical analysis
    - Syntax analysis
    - Lexer (Tokenizer) - create tokens
    - Parser - apply the syntax rules
  - Parsers:
    - Flex (used by Wekit)
    - Lex
    - Yacc
    - Bison (used by Wekit)
- Render Tree
  - Generated while DOM tree is constructed.
  - Positions rectangles based on definition of DOM element Render none, inline, block, inline-block, list-item. 
- Layout (Reflow)
  - Calculates position and size.
  - Most of the tiem it's possible to compute geometry in one pass.
  - Recursive process begins at teh root object (<html>)
  - Dirty bit system - a aystem that makes sure that browsers don'tneed to do the full layout on every interaction (i.e. only change the nodes that need to be re-renderred).
  - Global Incremental Layout - When user resizes window, or changes font size.
- Paint
  - Render tree is being traversed and the paint() method is used to display content on the page.
  - Global incremental paint - same dirty bit system that global incremental layout uses.
  - Order
    - background color
    - background image
    - border
    - children
    - outline

