'use strict';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? "[name].css" : "[name].[contenthash].css",
    chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
  }),
];

const modifyWebpackConfig = (webpackConfig, settings) => {
  const {rules} = webpackConfig.module;
  webpackConfig.plugins.push(plugins[0]);
  rules.push({
    // Webpack style loader added so we can use materialize
    test: /\.(s(a|c)ss)$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
  });
  return webpackConfig;
};

function setConfig(config) {
  config.development.port = 3004;
  config.development.hotLoader = {
    enabled: true,
    experimental: true,
  };

  config.modifyWebpackConfig = modifyWebpackConfig;
  return config;
}

module.exports = setConfig;