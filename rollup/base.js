import babel from "rollup-plugin-babel";

export default {
  input: __dirname + "/../src/index.js",
  plugins: [babel()],
  external: [
    "react",
    "react-dom",
    "prop-types",
    "@zeecoder/container-query",
    "@zeecoder/postcss-container-query",
    "@zeecoder/postcss-container-query/getMetadataFromMessages",
    "@zeecoder/react-container-query",
    "@zeecoder/container-query-meta-builder",
    "postcss",
    "postcss-nested",
    "postcss-media-minmax",
    "autoprefixer"
  ]
};
