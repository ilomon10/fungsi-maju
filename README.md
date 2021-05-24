 <div align="center">
  <img src="https://i.imgur.com/QKnFmTj.png"/>
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

## Interaction

**Move canvas**\
[Press + Hold] `Space` key then [Drag] `Right click` on canvas.\
![Move Canvas](https://i.imgur.com/SrbZCoB.gif "Move canvas")

**Move node**\
[Drag] Mouse `Right click` on node.\
![Move Node](https://imgur.com/uiCaoll.gif "Move node")

**Connect node socket**\
`Right click` on node socket source, then `Right click` on target socket.\
![Connect Node Socket](https://i.imgur.com/8SIKrOS.gif "Connect Node Socket")

**Remove connection**\
[Hover]`Mouse` on connection wire, [Press] `Backspace` key. [Hold] `Shift` to select multiple connection.\
![Remove connection](https://imgur.com/kkf9Xs5.gif "Remove Connection")

## API

### Schema

```json
{
  "version": "1.0.0",
  "nodes": [
    {
      "id": "string",
      "type": "string",
      "metadata": {},
      "outputs": [
        [ "string" ]
      ]
    },
    ...
  ]
}
```

### Events 

- `process`
- `nodeselected`
- `nodecreate`
- `nodecreated`
- `noderemove`
- `noderemoved`
- `connectionselected`
- `connectioncreated`
- `connectionremoved`

### Engine

```js
export { Engine } from "fungsi-maju";
```

**properties**
- extends [Emitter](https://github.com/ai/nanoevents)
- version = `string`
- components = `[Connection]`
- nodes = `[Node]`

| method                        | arguments                   | return              |
| ----------------------------- | --------------------------- | ------------------- |
| register(component)           | `Component`                 | [`Engine`](#engine) |
| validate(data)                | `json`                      | `boolean`           |
| process(input, startId, json) | `value`, `Node.id`, `json?` | `boolean`           |


### Editor 

```js
export { Editor } from "fungsi-maju";
```

**properties**
- extends [Engine](#engine)
- view = [`View`](#view)

| method                    | arguments                                  | return          |
| ------------------------- | ------------------------------------------ | --------------- |
| static generateId()       | -                                          | `string`        |
| addNode(node)             | [`Node`](#node)                            | [`Node`](#node) |
| removeNode(node)          | [`Node`](#node)                            | `boolean`       |
| getNode(node)             | [`Node`](#node)                            | `boolean`       |
| connect(from, branch, to) | [`Node`](#node), `number`, [`Node`](#node) | `boolean`       |
| toJSON()                  | -                                          | `json`          |
| fromJSON(json)            | `json`                                     | `json`          |


### Node

```js
export { Node } from "fungsi-maju";
```

**properties**
- id = `string`
- metadata = `Map`
- position = `object`
- type = `string`
- outputs = `[ [Node.id] ]`

| method                   | arguments                     | return          |
| ------------------------ | ----------------------------- | --------------- |
| addOutput(branch, id)    | `number`, [`Node.id`](#node)  | [`Node`](#node) |
| removeOutput(id, branch) | [`Node.id`](#node), `number?` | [`Node`](#node) |
| toJSON()                 | -                             | `json`          |


### View

**properties**
- emitter = [`Editor`](#editor)
- area = `Area`
- picker = `Picker`
- selection = `Selection`
- container = `HTMLElement`
- connection = `{Connection}`
- selected = `{NodeView}`
- nodes = `{NodeView}`

| method           | arguments          | return                  |
| ---------------- | ------------------ | ----------------------- |
| addNode(node)    | [`Node`](#node)    | [`NodeView`](#nodeview) |
| getNode(id)      | [`Node.id`](#node) | [`NodeView`](#nodeview) |
| removeNode(node) | [`Node`](#node)    | [`Node`](#node)         |

### NodeView

**properties**
- id = [`Node.id`](#node)
- view = [`View`](#view)
- node = [`Node`](#node)
- sockets = `{Socket}`
- component = `{Component}`
- container = `HTMLElement`
- element = `Element`

| method   | arguments | return |
| -------- | --------- | ------ |
| update() | -         | -      |
| render() | -         | -      |
| toJSON() | -         | `json` |


## Credit

Konsep prosesnya mirip [Node Red](https://github.com/node-red/node-red).\
Editor visual adopsi dari [vvvv](https://vvvv.org/).\
Library ini diekstrak dari library [ReteJS](https://github.com/retejs/rete).\
Emitter yang dipakai yaitu [nanoevents](https://github.com/ai/nanoevents).\
Template library menggunkan [js-library-boilerplate](https://github.com/hodgef/js-library-boilerplate).
