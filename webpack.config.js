const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo List",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
