const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: `/dist/static/css`,
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "initial",
        },
        scripts: {
          name: "main",
          test: /\.js$/,
          chunks: "async",
        },
      },
    },
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
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
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
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new webpack.DefinePlugin({
        __isBrowser__: "false",
      }),
    ],
  },
];
