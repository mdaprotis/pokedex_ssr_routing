const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const common = {
  devtool: "cheap-module-source-map",
  entry: {
    app: "./index.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "singletonStyleTag" },
          },
          "css-loader",
        ],
      },
    ],
  },
};

module.exports = [
  {
    ...common,
    entry: "./src/client",
    output: {
      path: `${__dirname}/dist/static`,
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "true",
      }),
    ],
  },
  {
    ...common,
    target: "node",
    entry: "./src/server",
    externals: [nodeExternals()],
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "false",
      }),
    ],
  },
];
