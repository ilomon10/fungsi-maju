import React from "react";
import Socket from "./Socket";

class Node extends React.Component {
  state = {};

  static getDerivedStateFromProps({ node, component, editor }) {
    return {
      outputs: node.outputs,
      hasInput: node.hasInput,
      selected: "selected",
      label: component.name
    }
  }
  render() {
    const { bindSocket } = this.props;
    const { outputs, hasInput, label } = this.state;
    return (
      <div className={`node`}>
        <div className="node-input">
          {hasInput &&
            <Socket type="input" id={0} innerRef={bindSocket} />}
        </div>
        <div className="node-output">
          {outputs.map((_, idx) => (
            <Socket key={idx} type="output" id={idx} innerRef={bindSocket} />
          ))}
        </div>
        <div className="node-content">{label}</div>
      </div>
    )
  }
}

export default Node;