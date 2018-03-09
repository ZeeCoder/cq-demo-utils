import processCSS from "./processCSS";
import initialiseAllContainers from "./initialiseAllContainers";

/**
 * @param {string} css
 */
const initialiseAllContainersFromCSS = css =>
  processCSS(css).then(meta => initialiseAllContainers(meta));

export default initialiseAllContainersFromCSS;
