
declare module "fungsi-maju" {

  interface JSON {
    version: string;
    nodes: object[] | Node[];
  }

  export class Component {
    name: string;
    engine: Engine;
    constructor(name: string);

    builder(node: Node | NodeView): void;
    worker(node: Node | NodeView, input: any): any;

    [customMethod: string]: any;
  }

  interface Metadata {
    [key: string]: any;
  }

  export class Node {
    id: string;
    type: string;
    metadata: Metadata;
    position: [x: number, y: number];
    outputs: [[]];

    constructor(id: string, outputs: [], options?: { position: [], metadata: any });

    setData(key: string, value: any): any;
    getData(key: string): any;
    removeData(key: string): any;

    addOutput(branch: string, id: string): this;
    removeOutput(id: string, branch?: string): this;
    toJSON(complete: boolean): any;
  }

  export class Emitter {
    events: {
      [key: string]: []
    }

    constructor(events: {});

    on(event: string, cb: () => {}): () => {};
    emit(event: string, ...args: any): void;
  }

  export class Engine extends Emitter {
    version: string;
    components: {
      [key: string]: Component
    };
    nodes: [Node];

    constructor(version: string);

    register(component: Component): Engine;
    validate(data: any): boolean;
    forwardProcess(node: Node, input: any): boolean;
    process(input: any, startId: Node["id"], json?: any): boolean;
  }

  export class Socket {
    element: HTMLElement;
    branch: string;
    type: string;
    nodeView: NodeView;

    constructor(element: HTMLElement, branch: string, type: string, nodeView: NodeView);
    destroy(): void;
  }

  export class Element {
    element: HTMLElement;
    sockets: {
      input: {},
      output: {}
    }

    constructor(nodeView: NodeView, name: string);

    render(view: View, node: Node): this["element"];
  }

  export class NodeView extends Node {
    view: View;
    node: Node;
    sockets: {
      [key: string]: Socket;
    };
    component: Component;
    container: HTMLElement;
    element: Element;

    constructor(node: Node, component: Component, view: View);

    addSocket(type: string, key: number, name: string): Socket;

    getElement(): this["element"]["element"];
  }

  export class View {
    emitter: Emitter;
    container: HTMLElement;
    components: [Component];

    constructor(container: HTMLElement, components: [Component], emitter: Emitter);

    addNode(node: Node): NodeView
  }

  export class Editor extends Engine {
    view: View;

    static generateId(): string;

    constructor(version: string, container?: HTMLElement);

    addNode(node: Node): Node;

    toJSON(): JSON;
    fromJSON(json: JSON): boolean;
  }
}