const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    server: "./server.ts",
  },
  externals: [/node_modules/],
  mode: "none",
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.ts$/,
      },
      {
        parser: {
          system: true,
        },
        /**
         * Mark files inside `@angular/core` as using SystemJS style dynamic imports.
         * Removing this will cause deprecation warnings to appear.
         */
        test: /([\\/])@angular([\\/])core([\\/]).+\.js$/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(.+)?angular([\\/])core(.+)?/,
      path.join(__dirname, "src"),
      {},
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express([\\/])(.+)?/,
      path.join(__dirname, "src"),
      {},
    ),
  ],
  resolve: {extensions: [".js", ".ts"]},
  target: "node",
};
