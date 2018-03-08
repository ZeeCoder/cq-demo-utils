import Container from "@zeecoder/container-query";

/**
 * @param {{
 *   [selector]: Object,
 * }} meta
 */
const initialiseAllContainers = meta => {
  if (meta.selector) {
    // Seems like a single container's stats object, so let's convert it to the
    // multi-container format.
    meta = {
      [meta.selector]: meta
    };
  }

  for (let containerSelector in meta) {
    document.querySelectorAll(containerSelector).forEach(htmlElement => {
      new Container(htmlElement, meta[containerSelector]);
    });
  }
};

export default initialiseAllContainers;
