# How Web Browsers Work
https://www.youtube.com/watch?v=2xm2IjniJOk

## Time Expense
- Browser wants to run at 60hz, 20ms or less between frames.
- Sydney is ~200ms RTT from California.
- Network is expensive, so the more you bundle and send as one request/response the faster your app will be.
- The bandwith has improved, but the initial network connection latency has not improved, and it might not get better.

## WebKit
- Web rendering engine.
- Isn't a browser, but it's an engine that powers a bunch of different browsers.
- Browser vendors need to support WebKit pluggable bits like:
  - URL parsing
  - Cache system
  - Network stack
  - Cookie storage
  - Database storage
  - Painting & Compositor
  - JavaScript engine
  - DOM bindings
  - Font rendering
  - Scrolling
  - Download handling
- WebKit gets all the content and position the content and calls out to all the little pluggable api to help display the page.

## Request to Page
- Start request
- DNS lookup
  - If we're lucky comes from local cache (~1ms)
  - Sub-resources can use 
  ```html <link rel="dns-prefetch" href="//emaple.com">```
  - Put at top of page.
- TCP connection
- HTTP handshake
  - HTTP headers aren't compressed.
  - use HTTP 1.1 with keepalive
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
  - Tokenization and parsing create a DOM tree.
- Render
  - Result of all CSS calculations.
  - Font sizes, border sizes, padding sizes, margin sizes etc.
- Layout
  - Uses DOM tree and CSS application.
  - CSS actual works bottom up with executed by browser. Browser looks at the rules on this element and the looks at each parent to see what other rules need to be applied.
  - This means the more specific you are the faster the browser can execute the rule. Meaning #some-id will execute faster.
  - Deep DOMS and lots of CSS rules/generic the CSS rule selector can slow the layout process. 

- Fastest layout system is the browser. So stop doing layout in JavaScript
- JavaScript blocks layout and rendering.

## Defer
- Call be back just before onLoad event.

## Async
- Promise not to Document.write

Keep main payload small and get it to the browser quikly.