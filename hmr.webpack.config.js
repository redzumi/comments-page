'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _compressionWebpackPlugin = require('compression-webpack-plugin');

var _compressionWebpackPlugin2 = _interopRequireDefault(_compressionWebpackPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO from config?
var IP = 'localhost';
var PORT = '3000';

var isProd = process.env.ENV == 'production';

console.log('Production:  ' + isProd);

console.log(undefined);

var common = {
  entry: {
    'app': __dirname + '/src/service/web/index.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    path: __dirname + '/build/service/web/assets',
    publicPath: 'http://' + IP + ':' + PORT + '/assets'
  },

  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$|\.jsx$/,
      loader: 'eslint-loader',
      exclude: [/assets/, /node_modules/]
    }, {
      test: /.jsx?$/,
      loader: ['react-hot-loader', 'babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: _extractTextWebpackPlugin2.default.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader'
      })
    }, {
      test: /\.scss$/,
      loader: _extractTextWebpackPlugin2.default.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader!sass-loader'
      })
    }]
  },

  plugins: [new _webpack2.default.optimize.CommonsChunkPlugin({
    name: ['app']
  }), new _webpack2.default.DefinePlugin({
    'process.env.ENV': isProd ? '"production"' : '"development"'
  }), new _htmlWebpackPlugin2.default({
    template: __dirname + '/src/service/web/index.html',
    filename: '../index.html'
  }), new _extractTextWebpackPlugin2.default('[name].css')]
};

var dev = (0, _webpackMerge2.default)(common, {
  entry: {
    'hmr': 'webpack-hot-middleware/client'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [new _webpack2.default.HotModuleReplacementPlugin()]
});

var prod = (0, _webpackMerge2.default)(common, {
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [new _webpack2.default.NoEmitOnErrorsPlugin(), new _webpack2.default.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      sequences: true,
      booleans: true,
      loops: true,
      unused: true,
      warnings: false,
      drop_console: true,
      unsafe: true
    }
  }), new _compressionWebpackPlugin2.default({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })]
});

isProd ? module.exports = prod : module.exports = dev;
