'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BlessPlugin = require('bless-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var proxy = require('http-proxy-middleware');
var argv = require('yargs').argv;

var proxies = {
  'ekko': {
    target: 'http://localhost:9998'
  },
  'local': {
    target: 'http://localhost:56949',
    pathRewrite: {
      '^/api': ''
    }
  },
  'dev': {
    target: 'https://rmhcpdev.availity.net/',
    secure: false,
    changeOrigin: true
  },
  'tst': {
    target: 'https://rmhcptst.availity.net/',
    secure: false,
    changeOrigin: true
  }
};

var proxyConfig = proxies[process.env.API_PROXY] || proxies.ekko;

var settings =  {

  packages: {
    src: [path.join(process.cwd(), './package.json'), path.join(process.cwd(), './bower.json')]
  },

  project: {
    path: process.cwd()
  },

  dest: function() {
    return this.isDistribution() ? path.join(process.cwd(), './dist') : path.join(process.cwd(), './build');
  },

  verbose: !!argv.verbose,

  args: argv,

  environment: function() {
    return process.env.NODE_ENV || 'development';
  },

  isTesting: function() {
    return this.environment() === 'testing';
  },

  isDistribution: function() {
    return this.isProduction() || this.isStaging();
  },

  isDebug: function() {
    return this.environment() === 'debug';
  },

  isStaging: function() {
    return this.environment() === 'staging';
  },

  isIntegration: function() {
    return this.environment() === 'integration';
  },

  isDevelopment: function() {
    return this.environment() === 'development';
  },

  isProduction: function() {
    return this.environment() === 'production';
  },

  // Uses globby which defaults to process.cwd() and path.resolve(options.cwd, "/")
  js: {
    src: [
      '**/**.js',
      '!node_modules/**',
      '!bower_components/**',
      '!dist/**',
      '!reports/**',
      '!build/**'
    ],
    reportsDir: path.join(process.cwd(), 'reports')
  },

  polyfill: {
    name: 'polyfill.js',
    src: [
      'bower_components/html5shiv/dist/html5shiv.min.js',
      'bower_components/respond/dest/respond.min.js'
    ],
    dest: './build/js'
  },

  templates: {
    cwd: 'project/app',
    src: [
      '**/*.html',
      '!project/app/index.html'
    ]
  }
};

var helper = {

  maps: function() {
    return settings.isDevelopment() ? 'source-map' : 'source-map';
  },

  entry: function() {
    return 'index.js';
  },

  // Don’t use [chunkhash] in development since this will increase compilation time
  // In production, [chunkhash] generate hashes depending on the file contents this if
  // the contents don't change the file could potentially be cached in the browser.
  fileName: function() {
    return settings.isDevelopment() ? '[name].js' : '[name]-[chunkhash].js';
  },

  cssFileName: function() {
    return settings.isDevelopment() ? '[name].css' : '[name]-[chunkhash].css';
  },

  output: function() {
    return  settings.isDistribution() ?
      path.join(settings.project.path, 'dist') :
      path.join(settings.project.path, 'build');
  }
};

var wpProjectPath = path.join(process.cwd(), 'project/app');

function resolveBower(componentPath) {
  return path.join(process.cwd(), '/bower_components', componentPath);
}

function getVersion() {
  return 3.3;
}

function getPkg() {
  return {};
}

var config = {

  context: wpProjectPath,

  entry: {
    index: 'index.js',
    vendor: ['vendor']
  },

  output: {
    path: helper.output(),
    filename: helper.fileName(),
    hash: settings.isDistribution(),
    pathinfo: settings.isDevelopment()
  },

  // devtool: 'source-map' cannot cache SourceMaps for modules and need to regenerate complete SourceMap for the chunk. It’s something for production…
  // devtool: 'eval-source-map' is really as good as devtool: 'source-map', but can cache SourceMaps for modules. It’s much faster for rebuilds.
  // devtool: 'eval-cheap-module-source-map' offers SourceMaps that only maps lines (no column mappings) and are much faster.
  // devtool: 'eval-cheap-source-map' is similar but doesn’t generate SourceMaps for modules (i. e. jsx to js mappings).
  //
  // The best performance has devtool: 'eval', but it only maps to compiled source code per module. In many cases this is good enough. Hint: combine it with output.pathinfo: true.
  // The UglifyJsPlugin uses SourceMaps to map errors to source code. And SourceMaps are slow. As you should only use this in production this is fine. If your production build is really slow (or doesn’t finish at all) you can disable it with new UglifyJsPlugin({ sourceMap: false }).
  devtool: helper.maps(),

  debug: settings.isDevelopment(),

  cache: settings.isDevelopment(),

  watch: false,

  noParse: [
    /.*bower_components.*/
  ],

  resolve: {
    root: [wpProjectPath],
    modulesDirectories: ['bower_components', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.less'],
    alias: {
      'jquery.ui.widget': resolveBower('blueimp-file-upload/js/vendor/jquery.ui.widget.js'),
      'load-image': resolveBower('blueimp-load-image/js/load-image.js'),
      'load-image-meta': resolveBower('blueimp-load-image/js/load-image-meta'),
      'load-image-exif': resolveBower('blueimp-load-image/js/load-image-exif'),
      'load-image-ios': resolveBower('blueimp-load-image/js/load-image-ios'),
      'canvas-to-blob': resolveBower('blueimp-canvas-to-blob/js/canvas-to-blob'),
      'tmpl': resolveBower('blueimp-tmpl/js/tmpl'),
      'blueimp-file-upload-angular': resolveBower('blueimp-file-upload/js/jquery.fileupload-angular'),
      flynet: path.join(__dirname, './project/app/claims/utilities/flynet/vendor/FVTermParent.js'),
      snapjs: path.join(__dirname, 'bower_components/snapjs/snap.min.js'),
      'angular-snap-shim': path.join(__dirname, 'bower_components/angular-snap/angular-snap.js'),
      'inputmask.dependencyLib': path.join(__dirname, 'bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js')
    }
  },

  resolveLoader: {
    root: [
      path.join(__dirname, '../node_modules'),  // local
      path.join(process.cwd(), './node_modules') // parent project
    ]
  },

  module: {
    loaders: [
      { test: /[\\\/]angular\.js$/, loader: 'expose?angular!exports?angular' }, // export angular so we can do `var angular = require('angular')`
      { test: /[\\\/]jquery\.js$/, loader: 'expose?$!expose?jQuery' }, // export jQuery and $ to global scope.
      { test: /[\\\/]lodash\.js$/, loader: 'expose?_' }, // export jQuery and $ to global scope.
      { test: /[\\\/]moment\.js$/, loader: 'expose?moment' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css', {
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!autoprefixer-loader?{browsers: ["last 3 versions", "ie 8", "ie 9", "> 1%"]}!less-loader',
          {
            publicPath: '../'
          }
        )
      },
      {
        // test should match the following:
        //
        //  '../fonts/availity-font.eot?18704236'
        //  '../fonts/availity-font.eot'
        //
        test: /\.(ttf|woff|eot|svg).*/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {test: /\.(jpe?g|png|gif)$/, loader: 'file?name=images/[name].[ext]'},
      {test: /\.html$/, loader: 'html'},
      {test: /\.json$/, loader: 'json-loader'}

    ]
  },
  plugins: [

    // ignore all the moment local files
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

    new BowerWebpackPlugin({
      excludes: [
        /.*\.(less|map)/,
        /glyphicons-.*\.(eot|svg|ttf|woff)/,
        /bootstrap.*\.css/,
        /select2.*\.(png|gif|css)/
      ]
    }),

    new CopyWebpackPlugin([
      {
        from: path.join(path.resolve(__dirname, '..'), '/app/index.html'),
        to: path.join(path.resolve(__dirname, '..'), '../build')
      }
    ]),

    new WebpackMd5Hash(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash'
    }),

    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(getVersion())
    }),

    new BlessPlugin({
      imports: true
    }),

    new HtmlWebpackPlugin({
      template: 'project/app/index.html',
      favicon: 'project/app/favicon.ico',
      filename: 'index.html',
      pkg: getPkg()
    }),

    // Use bundle name for extracting bundle css
    new ExtractTextPlugin('css/' + helper.cssFileName(), {
      allChunks: true
    }),

    new BrowserSyncPlugin({
      notify: true,
      port: 3000,
      server: {
        baseDir: [path.join(process.cwd(), './build')],
        middleware: [
          proxy('/api', proxyConfig)
        ]
      }
    })
  ]

};

if (settings.isStaging()) {

  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  );

}

if (settings.isProduction()) {

  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourceMap: false,
      compress: {
        drop_console: true,
        warnings: false
      },
      output: {
        comments: false,
        max_line_len: 1000
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  );

}

module.exports = config;
