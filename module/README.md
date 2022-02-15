# JavaScript Module Systems

https://www.freecodecamp.org/news/anatomy-of-js-module-systems-and-building-libraries-fadcd8dbd0e/

## Problem
As JavaScript development gets more and more widespread, namespaces and dependencies get much more difficult to handle. 
Different solutions have been developed to deal with this problem in the form of module systems.

## Different Types of JS Module Systems ?

1. `CommonJS`

- Implemented by `node`
- Used for the server side when you have modules installed
- No runtime/async module loading
- import via “`require`”
- export via “`module.exports`”
- When you import you get back an object
- No tree shaking, because when you import you get an object
- No static analyzing, as you get an object, so property lookup is at runtime
- You always get a copy of an object, so no live changes in the module itself
- Poor cyclic dependency management
- Simple Syntax

2. `AMD`: Async Module Definition

- Implemented by `RequireJs`
- Used for the client side (browser) when you want dynamic loading of modules
- Import via “`require`”
- Complex Syntax

https://addyosmani.com/writing-modular-js/
AMD began as a draft specification for a module format on the CommonJS list but as it wasn't able to reach full concensus, further development of the format moved to the amdjs group.

Today it's embraced by projects including Dojo (1.7), MooTools (2.0), Firebug (1.8) and even jQuery (1.7). Although the term CommonJS AMD format has been seen in the wild on occasion, it's best to refer to it as just AMD or Async Module support as not all participants on the CJS list wished to pursue it.

3. `UMD`: Universal Module Definition

- Combination of `CommonJs` + `AMD` (that is, Syntaxof CommonJs + async loading of AMD)
- Can be used for both AMD/CommonJs environments
- UMD essentially creates a way to use either of the two, while also supporting the global variable definition. 
- UMD modules are capable of working on both client and server.

4. `ECMAScript` `Harmony` (ES6)

- Used for both server/client side
- Runtime/static loading of modules supported
- When you import, you get back bindings value (actual value)
- Import via “`import`” and export via “`export`”
- Static analyzing — You can determine imports and exports at compile time (statically) — you only have to look at the source code, you don’t have to execute it
- Tree shakeable, because of static analyzing supported by ES6
- Always get an actual value so live changes in the module itself
- Better cyclic dependency management than `CommonJS`

Although the ES Harmony module system is supported by all the tools and modern browsers, 
we never know when publishing libraries how our consumers might utilize them.

## Tree Shaking
`Webpack` and `Rollup` both support Tree Shaking, meaning we need to keep certain things in mind so that our code is tree shakeable.

## Publish
- We should publish all the module variants, like `UMD` and `ES`
- Even though all the bundlers like Webpack and Rollup understand ES modules, if our consumer is using Webpack 1.x, then it cannot understand the ES module.

## Package.json
- The `main` field of the `package.json` file is usually used to point to the `UMD` version of the library/package.
- The `module` field of the `package.json` is used to point to the `ES` version of the library/package. 

Performance Tip: Always try to publish the `ES` version of your library/package as well, 
because all the modern browsers now support `ES` modules. 

So you can transpile less, and ultimately you’ll end up shipping less code to your users. 
This will boost your application’s performance.

## Webpack
- Webpack is a great module `bundler`
- Mostly used for building SPAs 
- Code splitting
- Async loading of bundles
- Tree shakin
- CommonJS module system

## RollupJS
- Rollup is also a `module bundler` similar to Webpack. 
- Follows new standardized formatting for code modules included in the `ES6` revision
- Bundle the `ES` module variant of your library/package
- Doesn’t support async loading of bundles

## Babel
- Babel is a `transpiler` for JavaScript best known for its ability to turn ES6 code into code that runs in your browser (or on your server) today
- It just transpiles and doesn’t bundle your code

My advice: use `Rollup` for libraries and `Webpack` for apps

## Transpile or Bundle

Two categories:

1. UI Libraries (styled-components, material-ui)
2. Core Packages (react, react-dom)

Imagine if we just publish the bundled version of our library and host it on CDN

### UI Libraries
- `Bundle` and `minify` the `src` into `dist` using `rollup` for `cjs/umd` and `es` module systems as a target
- `Transpile` the `src` into `lib` using `Babel` for `es` module system as a target
- Host the lib on a CDN, our consumers can actually get whatever they want without any overhead
```html
<script type="module">import {Button} from "https://unpkg.com/uilibrary/lib/button.js";</script>
```
- Modify the `package.json` to point to the proper target systems
```json
  "main": "dist/index.js",      // for umd/cjs builds
  "module": "dist/index.es.js", // for es build
```

### Core Packages
- Have just one folder which has the `bundled` and `minified` version for `CJS` or `UMD` module system as a target
- Core packages are never utilized via the `<script/>` tag, as they need to be part of main application. 
- Release the `bundled` version (`UMD`, `ES`) for these kinds of packages and leave the build system up to the consumers.
- For example, they can use the `UMD` variant but no tree shaking, or they can use the `ES` variant if the bundler is capable of identifying and getting the benefits of tree shaking.
- For core packages, we don’t need the lib version.
```javascript
// CJS require
const Button = require("uilibrary/button");

// ES import
import {Button} from "uilibrary";
```
- `Bundle` and `minify` the `src` using `rollup` for `cjs/umd` and `es` module systems as targets
- Modify the `package.json` to point to the proper target system

Tip: We can host the dist folder on the CDN as well, for the consumers who are willing to download the whole library/package via `<script/>` tag.

In `package.json` , the "files" field is an array of file patterns that describes the entries to be included
when your package is installed as a dependency

If you name a folder in the array, then it will also include the files inside that folder.

https://2ality.com/2014/09/es6-modules-final.html
- `CommonJS` nested strucutre
- `ECMAScript 6` flat structure (statically analyzable)

make default exports as convenient as possible

`ECMAScript 6` favors the single/default export style, and gives the sweetest syntax to importing the default.

Importing named exports can and even should be slightly less concise.

by building the module system into the language, you can syntactically enforce a static module structure.

A module’s structure being static means that you can determine imports and exports at compile time (statically) – you only have to look at the source code, you don’t have to execute it. The following are two examples of how CommonJS modules can make that impossible

[4.2.1 Benefit 1: faster lookup](https://2ality.com/2014/09/es6-modules-final.html#benefit-1%3A-faster-lookup)
If you require a library in CommonJS, you get back an object:

```javascript
var lib = require('lib');
lib.someFunc(); // property lookup
```
Thus, accessing a named export via `lib.someFunc` means you have to do a property lookup, which is slow, because it is dynamic.

In contrast, if you import a library in ES6, you statically know its contents and can optimize accesses:
```javascript
import * as lib from 'lib';
lib.someFunc(); // statically resolved
```

