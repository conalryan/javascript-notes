# JavaScript - Notes

## Run

- Any index.html locally with [http-server](https://github.com/indexzero/http-server)

```bash
npm install npm install http-server -g
# cd <some-path>/
http-server
```

or
`bash http-server <some-path>/`

## What?

1. What Happens if I Serve a directory with no index.html?

- Browser will display the contents of the directory (essentially same as `bash ls`).

2. Add (a blank) index.html

- User sees white page.
- Inspect in dev tools

```html
<html>
  <head></head>
  <body></body>
</html>
```

- Where did those tags come from?

3. Write "what" in the index.html

- What will the browser display?
- It display "what"
- Why? It's not in a tag.
- HTML/Browser is very forgiving, it will 'fix' your error...at least as best as it can.

4. How can we get our JavaScript to execute in the browser?

- By a <script> tag in an html document.

5. HTML serves 2 purposes: 1) Initialize DOM, 2) Execute JavaScript

6. What is the Purpose of JavaScript?

- To manipulate the DOM.

7. Which is Faster HTML of JavaScript?

- HTML 226ms
- JS 229ms
- So only 3ms slower for a simple h1 tag. Is that bad?
