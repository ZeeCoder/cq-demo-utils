import babel from "rollup-plugin-babel";

export default {
  input: __dirname + "/../src/index.js",
  plugins: [babel()],
  external: [
    "react",
    "react-dom",
    "@zeecoder/container-query",
    "@zeecoder/postcss-container-query",
    "postcss"
  ]
};
