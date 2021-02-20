 <div align="center">
  <img src="EXAMPLE.png"/>
  <h2>Fungsi Maju</h2>
  <blockquote>Library javascript untuk memproses fungsi berantai dengan format JSON</blockquote>
  <a href="https://www.npmjs.com/package/fungsi-maju"><img alt="Build Status" src="https://img.shields.io/npm/v/fungsi-maju" /></a> <a href="https://github.com/ilommon10/fungsi-maju/actions"><img alt="Build Status" src="https://github.com/ilomon10/fungsi-maju/workflows/Build/badge.svg?color=green" /></a> <a href="https://github.com/ilomon10/fungsi-maju/actions"> <img alt="Publish Status" src="https://github.com/ilomon10/fungsi-maju/workflows/Publish/badge.svg?color=green" /></a> <img src="https://img.shields.io/david/ilomon10/fungsi-maju.svg" /> <a href="https://david-dm.org/ilomon10/fungsi-maju?type=dev"><img src="https://img.shields.io/david/dev/ilomon10/fungsi-maju.svg" /></a>

</div>

## ⭐️ Feature

- [x] Engine untuk proses fungsi
- [x] Validator skema json
- [x] Editor visual

## 📦 Getting Started

> NOTE: LIBRARY INI MASIH BERSIFAT EKPERIMEN

```bash
$ npm install fungsi-maju
```

### npm

```js
import { Engine } from 'fungsi-maju';
import 'fungsi-maju/build/index.css' // If you import a css file in your library

let libraryInstance = new Engine("0.1.0");
...
```

### self-host/cdn

```js
<link href="build/index.css" rel="stylesheet">
<script src="build/index.js"></script>

let FungsiMaju = window.Engine.default;
let libraryInstance = new FungsiMaju.Engine("0.1.0");
...
```

## Example

```js
import { Editor, Node, Component } from "fungsi-maju";

class Basic extends Component {
  constructor() {
    super("Basic");
  }
  builder(nodeView) {
    nodeView.addSocket("output", 0, "Output");
    return nodeView;
  }
  worker(node, input) {
    const output = input * 2;
    return output;
  }
}

class Debug extends Component {
  constructor() {
    super("Debug");
  }
  builder(nodeView) {
    nodeView.addSocket("input", 0, "Output");
    return nodeView;
  }
  worker(node, input) {
    console.log(input);
  }
}

let container = document.getElementById("editor");

let editor = new Editor("0.1.0", container);

editor.register(new Basic());
editor.register(new Debug());

let node = [
  new Node(Editor.generateId(), "Basic"),
  new Node(Editor.generateId(), "Debug"),
];

editor.addNode(node[0]);
editor.addNode(node[1]);

editor.connect(node[0], 0, node[1]);

const inputValue = 1;

editor.process(inputValue, node[0]);

editor.on("process", () => {
  console.log("process")
});
```

### Tanpa View

```js
import { Editor, Node, Component } from "fungsi-maju";

class MyComponent extends Component{
  constructor(name) {
    super(name);
  }
  worker(node, input) {
    const output = input + 1;
    return output;
  }
}

let editor = new Editor("0.1.0");

editor.register(new MyComponent("CustomComponent"));

let node = [
  new Node(Editor.generateId(), "CustomComponent"),
  new Node(Editor.generateId(), "CustomComponent"),
]

editor.addNode(node[0]);
editor.addNode(node[1]);

editor.connect(node[0], 0, node[1]);

const inputValue = 1;

editor.process(inputValue, node[0]);

editor.on("process", () => {
  console.log("process")
});
```

## API

### Engine extends [Emitter](https://github.com/ai/nanoevents)

| property | arguments | return |
|---|---|---|
| register(component) | `Component` | `Engine` |
| validate(data) | `json` | `boolean` |
| process(input, startId, json) | `value`, `Node.id`, `json?` | `boolean` |

### Editor extends [Engine](#engine)

| property | arguments | return |
|---|---|---|
| static generateId() | - | `string` |
| addNode(node) | `Node` | `Node` |
| removeNode(id) | `Node.id` | `boolean` |
| connect(from, branch, to) | `Node`, `number`, `Node` | `boolean` |
| toJSON() | - | `json` |

### Node

| property | arguments | return |
|---|---|---|
| addOutput(branch, id) | `number`, `Node.id` | `Node` |
| removeOutput(id, branch) | `Node.id`, `number?` | `Node` |
| toJSON() | - | `json` |


## Credit

Library ini diekstrak dari library [ReteJS](https://github.com/retejs/rete).

Template library menggunkan [js-library-boilerplate](https://github.com/hodgef/js-library-boilerplate).