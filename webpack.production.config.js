const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin') //打包 css
const autoprefixer = require('autoprefixer') //自动处理浏览器前缀
const CopyWebpackPlugin=require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成 html
const CleanWebpackPlugin = require('clean-webpack-plugin') //用于清除上次打包文件
const Visualizer = require('webpack-visualizer-plugin')
const pxtorem = require('postcss-pxtorem');
const theme = require('./package.json').theme;
module.exports = {
  entry: {
    bundle: path.join(__dirname, '/app/src/index.js'),
    vendors: ["react", "react-dom", "react-router", "react-router-redux", "react-redux", "redux"], //第三方库和框架另外打包
  },
  output: {
    path: path.join(__dirname, '/dist/build/'),
    // publicPath: '', //有需要请自己配置，表示 index.html 中引入资源的前缀path
    filename: 'js/bundle.[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  cache: true,
  devtool: false,
  module: {
    rules: [{
      test: /\.jsx?$/,
      loaders: 'react-hot-loader!babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?minimize', 'postcss-loader']
      })
    }, {
      test: /\.less/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?minimize', 'postcss-loader',  {loader: 'less-loader', options: {modifyVars: theme}}],

      })
    },
        {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      loaders: [
        'url-loader?limit=10000&name=img/[hash:8].[name].[ext]',
      ]
    }, {
        test: /\.(svg)$/i,
        loaders: [
            'svg-sprite-loader'
        ],include:[ require.resolve('antd-mobile').replace(/warn\.js$/, ''),
            path.resolve(__dirname, 'app/src/images/step')]
    }]
  },
  resolve: {
    extensions: [' ', '.web.js', '.js', '.jsx'],
  },
  
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function () {
                return [autoprefixer,
                    pxtorem({
                        rootValue: 100,
                        propWhiteList: []
                    })]
            }
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendors.[chunkhash:8].js',
    }),
    new ExtractTextPlugin({
      filename: 'css/style.[contenthash:8].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false, // remove all comments
      },
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new Visualizer(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 15
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1000
    }),
    new HtmlWebpackPlugin({
      template: './dist/template.ejs',
      title: '重庆交委移动办公',
      favicon: './app/favicon.ico',
      chunks: ['bundle', 'vendors']
    }),
      new CopyWebpackPlugin([{from:'dist/antm-viewport.min.js',to:"./"
      }]),
    new CleanWebpackPlugin(['dist/build'], {
      verbose: true,
      dry: false
    })
  ]
}