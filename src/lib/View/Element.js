import React, { Component } from "react";

class Element extends Component {
  state = {};

  static getDerivedStateFromProps({ node, view }) {
    return {
      outputs: Array.from(node.outputs),
      selected: view.selected.hasOwnProperty(node.id) ? 'selected' : ''
    }
  }

  render() {
    const { node, bindSocket } = this.props;
    const { selected, outputs } = this.state;
    return (
      <div id={node.id} className={`node ${selected}`}>
        <div className="node-input">
          <div className="node-socket" ref={el => bindSocket(el, "input", 0)} />
        </div>
        <div className="node-content">{node.type}</div>
        <div className="node-output">
          {outputs.map((_, id) => (<div key={id} ref={el => bindSocket(el, "output", id)} className="node-socket" />))}
        </div>
      </div>
    )
  }
}

export default Element;