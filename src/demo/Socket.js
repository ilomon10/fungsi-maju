import React from "react";

class Socket extends React.Component {
  createRef = el => {
    const { innerRef, type, id } = this.props;
    el && innerRef(el, type, id);
  }

  render() {
    const { id } = this.props;
    return (
      <div
        className={`node-socket-${id}`}
        ref={el => this.createRef(el)}
      >
        <div><span>Value</span><span>{id}</span></div>
      </div>
    )
  }
}

export default Socket;