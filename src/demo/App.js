import './css/App.css';
import Lib from './../lib';
import Inject from './Inject';
import Switch from './Switch';
import Debug from './Debug';

class App {
  nodes = null;

  constructor() {
    this.engine = new Lib.Engine("0.1.0");
    this.engine.register(new Inject());
    this.engine.register(new Switch());
    this.engine.register(new Debug());
  }

  run(input, startId) {
    this.engine.process(input, startId, {
      "version": "0.1.0",
      "nodes": this.nodes
    });
  }
}

export default App;
