const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugins = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
  mode: 'production',
  // 文件监听
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 300,
  //   poll: 1000
  // },
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './static/js/[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(le|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                'overrideBrowserslist': ['last 5 version', '>0.1%', 'not dead']
              })
            ]
          }
        }, 
        {
          loader: 'px2rem-loader',
          options: {
            remUit: 75,
            remPrecesion: 8
          }
        }
        ]
      },
      {
        test: /\.(png|jpg|svg|jpeg)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            esModule: false,
            name: 'img/[name]_[hash:8].[ext]',
            outputPath: 'static'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugins({
      template: path.join(__dirname, 'src/html/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      }
    }),
    new HtmlWebpackPlugins({
      template: path.join(__dirname, 'src/html/search.html'),
      filename: 'search.html',
      chunks: ['search'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      }
    }),
    new MiniCssExtractPlugin({
      filename: './static/css/[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetsNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ]

}