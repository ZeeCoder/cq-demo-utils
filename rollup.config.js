import babel from "rollup-plugin-babel";

export default {
  input: __dirname + "/src/index.js",
  output: {
    file: __dirname + "/dist/bundle.cjs.js",
    format: "cjs"
  },
  plugins: [babel()],
  external: [
    "react",
    "react-dom",
    "@zeecoder/container-query",
    "@zeecoder/postcss-container-query",
    "postcss"
  ]
};
