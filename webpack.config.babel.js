import webpack                from 'webpack';
import webpackMerge 	        from 'webpack-merge';

import HtmlWebpackPlugin      from 'html-webpack-plugin';
import ExtractTextPlugin      from 'extract-text-webpack-plugin';

//in future mb
//webpack --env.ip localhost --env.port 3000 --env.prod true
//with
//export default (options) => { return {}; };

//default
let options = {
  ip: 'localhost',
  socket: 'http://localhost:3001',
  port: 3000,
  prod: false
};
export { options };

console.log(`Options:  ${JSON.stringify(options)}`);

const IP      = options.ip;
const PORT    = options.port;
const isProd  = (options.prod == 'true' || options.prod);

console.log(`Production:  ${isProd}`);

const common = {
  entry: {
    'app': __dirname + '/src/service/web/index.js',
    'vendors': __dirname + '/src/service/web/vendors.js'
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
        loader: ['react-hot-loader', 'babel-loader'],
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
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|map)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app']
    }),
    new webpack.DefinePlugin({
      'process.env.OPTIONS': `${JSON.stringify(options)}`
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/service/web/index.html',
      filename: '../index.html',
    }),
    new ExtractTextPlugin('[name].css')
  ]
};

let dev = webpackMerge(common, {
  entry: {
    'hmr': 'webpack-hot-middleware/client'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
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
    })
  ]
});

export default (isProd) ? prod : dev;
