const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: { // 配置别名
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: [".js", ".vue", ".json"] // 默认值: [".js",".json"]  模块名字可以省略的后缀名
  },
  externals: {  // 把一个模块做成外部依赖，不会打包到 js文件中。
    jquery: 'jQuery',
    lodash: '_'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }, {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Title', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/main.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true, // 是否移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}