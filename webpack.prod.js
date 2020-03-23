const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugins = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob')
const htmlWebpackExternalsPlugins = require('html-webpack-externals-plugin')



const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugins({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', 'commons', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        }
      })
    )
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
  mode: 'production',
  // 文件监听
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 300,
  //   poll: 1000
  // },
  entry: entry,
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
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: './static/css/[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetsNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // new htmlWebpackExternalsPlugins({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://unpkg.com/react@16/umd/react.development.js',
    //       global: 'React'
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
    //       global: 'ReactDOM'
    //     },
    //   ]
    // })
  ],
  //打包进vendors, 需要在htmlwebpackplugins 中chunks中使用
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /(react|reacr-dom)/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  
  optimization: {
    splitChunks: {
      minSize: 0, //最小打包大小
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2  //引用超过几次
        }
      }
    }
  }
  // devtool: 'inline-source-map'

}