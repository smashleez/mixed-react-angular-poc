const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

var config = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'index': ['./src/index.js'],
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    jsonpFunction: 'wpJsonpContainerApp'
  },
  module: {
    rules: [
      
      {
        // Webpack style loader added so we can use materialize
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // Webpack style loader added so we can use materialize
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        //for IE 11 support, we need to transpile our node modules for compatability and polyfills
        //exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/
      },
      {
        // This plugin will allow us to use AngularJS HTML templates
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react']
        }
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      'template': 'src/index.html',
      'inject': false
    }),
    // A webpack plugin to remove/clean the output folder before building
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: 'index.html'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/index.css',
        to: 'index.css'
      }
    ])
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true,
    port: 8081,
    // writeToDisk: true,
    proxy: {
      '/api': 'http://localhost:3000/api',
      '/ReportingAnalytics': 'http://localhost:4200/api'
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new HtmlReplaceWebpackPlugin([
    {
      pattern: 'http://localhost:3004',
      replacement: 'navbar'
    }
  ]))
}

module.exports = config;
