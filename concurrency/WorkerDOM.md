## [WorkerDom](https://github.com/ampproject/worker-dom)

- Library to transfer work to worker thread off the main thread.
- Works with Redux.

## Tokenization

- Browser converts HTML markup to tokens

```html
<section src="vanilla.js">
  <div>Hello World! <span>spaner</span> <input /></div>
</section>
```

becomes:

```
HTMLSectionElement
  HTMLDivElement
    Text
  HTMLSpanElement
    Text
  HTMLInputElement
```

## Hydration

- WorkerDOM implementation of tokenization.
- Compare and Upgrade String Markup into DOM Nodes.
- Interface to transfer DOM representation between threads.

```typescript
export interface HydrateableNode {
  readonly nodeType: NodeTyp; // NodeType.ELEMENT_NODE
  readonly nodeName: string; // "div"
  readonly _index_: number; // 3
  readonly transferred: boolean; // false

  readonly attributes?: Array<Attribute>; // []
  readonly properties?: Array<Property>; // []
  readonly childNode?: Array<HydrateableNode>; // [...]
  readonly textContent?: string; // undefined
  readonly namespaceURI?: string; // undefined
}
```

- JSON Representation

```json
{
  "nodeType": 1,
  "nodeName": "section",
  "childNodes": [
    {
      "nodeType": 1,
      "nodeName": "div",
      "childNodes": [...],
      "_index_": 5,
      "transferred": false
    }
  ],
  "_index_": 4,
  "transferred": false
}
```

- Transformed by WorkerDOM to number format

```
[0, 1, 4, 7, 8]
```

```json
{
  0: 1,
  1: "section",
  4: [
    {
      0: 1,
      1: "div",
      4: [...],
      7: 5,
      8: false
    }
  ],
  7: 4,
  8: false
}
```

- Transform booleans to binary numbers 0 == false, 1 == true

```json
{
  0: 1,
  1: "section",
  4: [
    {
      0: 1,
      1: "div",
      4: [...],
      7: 5,
      8: 0
    }
  ],
  7: 4,
  8: 1
}
```

- nodeName string converted to number representation

```json
{
  0: 1,
  1: 1,
  4: [
    {
      0: 1,
      1: 2,
      4: [...],
      7: 5,
      8: 0
    }
  ],
  7: 4,
  8: 1
}
```
