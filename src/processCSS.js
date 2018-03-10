import containerQuery, {
  getMetadataFromMessages
} from "@zeecoder/postcss-container-query";
import postcss from "postcss";
import nested from "postcss-nested";
import mediaMinMax from "postcss-media-minmax";
import autoprefixer from "autoprefixer";

/**
 * Processes the given CSS with some select plugins, after which it resolves
 * with the extracted metadata.
 *
 * @param {string} css
 * @param {{}} [options] container query postcss plugin options
 * @return {Promise<{}>}
 */
const processCSS = (css, options = {}) =>
  new Promise(resolve => {
    options.getJSON = () => {};
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
      .then(({ messages, css }) => {
        const meta = getMetadataFromMessages(messages);

        resolve(meta);
        appendCSS(css);
      });
  });

/**
 * Appends the given CSS to <head> in a new <style> element.
 *
 * @param {string} css
 */
const appendCSS = css => {
  const cssElement = document.createElement("style");
  cssElement.type = "text/css";
  cssElement.innerHTML = css;
  document.head.appendChild(cssElement);
};

export default processCSS;
