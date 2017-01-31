import webpack                from 'webpack';
import webpackMerge 	        from 'webpack-merge';

import CompressionPlugin      from 'compression-webpack-plugin';
import HtmlWebpackPlugin      from 'html-webpack-plugin';
import ExtractTextPlugin      from 'extract-text-webpack-plugin';

// TODO from config?
const IP      = 'localhost';
const PORT    = '3000';

const isProd = (process.env.ENV == 'production');

console.log(`Production:  ${isProd}`);

const common = {
  entry: {
    'app': __dirname + '/src/service/web/index.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    path: __dirname + '/build/service/web/assets',
    publicPath: `http://${IP}:${PORT}/assets`
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$|\.jsx$/,
        loader: 'eslint-loader',
        exclude: [/assets/, /node_modules/]
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app']
    }),
    new webpack.DefinePlugin({
      'process.env.ENV': (isProd) ? '"production"' : '"development"'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/service/web/index.html',
      filename: '../index.html',
    }),
    new ExtractTextPlugin('[name].css')
  ]
};

let dev = webpackMerge(common, {
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  }
});

let prod = webpackMerge(common, {
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences   : true,
        booleans    : true,
        loops       : true,
        unused      : true,
        warnings    : false,
        drop_console: true,
        unsafe      : true
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});

(isProd) ? module.exports = prod : module.exports = dev;
