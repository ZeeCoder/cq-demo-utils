import Container from "@zeecoder/container-query";

/**
 * @param {{
 *   [selector]: Object,
 * }} stats
 */
const initialiseAllContainers = stats => {
  if (stats.selector) {
    // Seems like a single container's stats object, so let's convert it to the
    // multi-container format.
    stats = {
      [stats.selector]: stats
    };
  }

  for (let containerSelector in stats) {
    document.querySelectorAll(containerSelector).forEach(htmlElement => {
      new Container(htmlElement, stats[containerSelector]);
    });
  }
};

export default initialiseAllContainers;
