import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "@zeecoder/container-query";
import containerQuery from "@zeecoder/postcss-container-query";
import postcss from "postcss";
import nested from "postcss-nested";
import mediaMinMax from "postcss-media-minmax";
import autoprefixer from "autoprefixer";

/**
 * Processes the given CSS with some select plugins, after which it resolves
 * with the processed CSS and the container query stats.
 *
 * @param {string} css
 * @param {{}} [options] container query postcss plugin options
 * @return {Promise<{
 *   css: string,
 *   stats: Object,
 * }>}
 */
export const processCSS = (css, options = {}) =>
  new Promise(resolve => {
    options.getJSON = (filepath, stats) => resolve(stats);
    postcss([
      nested({ bubble: ["container"] }),
      mediaMinMax(),
      autoprefixer({
        browsers: [
          ">1%",
          "IE >= 9",
          "FF >= 30",
          "Chrome >= 30",
          "Safari >= 10",
          "Edge >= 12"
        ]
      }),
      containerQuery(options)
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

/**
 * @param {{
 *   [selector]: Object,
 * }} containers
 * @param {boolean} [adjustOnWindowResize]
 */
export const initialiseAllContainers = (
  containers,
  adjustOnWindowResize = true
) => {
  for (let containerSelector in containers) {
    document.querySelectorAll(containerSelector).forEach(htmlElement => {
      new Container(htmlElement, containers[containerSelector]);
    });
  }
};
