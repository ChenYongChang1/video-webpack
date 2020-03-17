const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugins = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  mode: 'development',
  
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader','less-loader']
      },
      {
        test: /\.(png|jpg|svg|jpeg)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            esModule: false,
            name: 'img/[name]_[hash:8].[ext]',
            outputPath: 'assets'
          }
        }
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugins({
      template: './src/html/index.html',
      chunks: 'index',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}