import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "@zeecoder/container-query";
import processCSS from "./processCSS";

/**
 * A HoC that processes the given raw css as container query CSS, then appends
 * the processed css to <head>.
 *
 * @param {Component} WrappedComponent
 * @param {string} rawCSS
 * @param {Object} opts Options to pass to the `Container` instance.
 * @return {Component}
 */
const withContainerQueryCSS = (WrappedComponent, rawCSS, opts = {}) => {
  const processing = processCSS(rawCSS);

  return class extends Component {
    componentDidMount() {
      processing.then(
        meta => new Container(ReactDOM.findDOMNode(this), meta, opts)
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withContainerQueryCSS;
