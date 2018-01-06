import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "@zeecoder/container-query";
import containerQuery from "@zeecoder/postcss-container-query";
import postcss from "postcss";

/**
 * Processes the given CSS with some select plugins, after which it resolves
 * with the processed CSS and the container query stats.
 *
 * @param {string} css
 * @return {Promise<{
 *   css: string,
 *   stats: Object,
 * }>}
 */
export const processCSS = css =>
  new Promise(resolve => {
    postcss([
      containerQuery({
        getJSON: (filepath, stats) => resolve(stats)
      })
    ])
      .process(css, { from: "src/app.css", to: "dest/app.css" })
      .then(result => appendCSS(result));
  });

/**
 * Appends the given CSS to <head> in a new <style> element.
 *
 * @param {string} css
 */
export const appendCSS = css => {
  const cssElement = document.createElement("style");
  cssElement.type = "text/css";
  cssElement.innerHTML = css;
  document.head.appendChild(cssElement);
};

/**
 * A HoC that processes the given raw css as container query CSS, then appends
 * the processed css to <head>.
 *
 * @param {Component} WrappedComponent
 * @param {string} rawCSS
 * @param {Object} opts Options to pass to the `Container` instance.
 * @return {Component}
 */
export const withContainerQueryCSS = (WrappedComponent, rawCSS, opts = {}) => {
  const processing = processCSS(rawCSS);

  return class extends Component {
    componentDidMount() {
      processing.then(
        stats => new Container(ReactDOM.findDOMNode(this), stats, opts)
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
