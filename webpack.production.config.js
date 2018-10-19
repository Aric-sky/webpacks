const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const utils = require('./utils')


module.exports = {
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },
    devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }, {
                    loader: "postcss-loader"
                }],
            })
        }, {
            // 解决图片的路径在发布前后不一致的问题（资源打包前在/src/assert和/static中，打包后全部归并到/dist/static目录下）
            //vue-cli中：assert中的资源要经过webpack处理，只能通过相对路径（视为模块依赖）访问；/static中的资源不用经过webpack处理，通过绝对路径访问
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,  // 小于8kb的直接转为base64
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: utils.assetsPath('img/[name].[hash:7].[ext]') // 被加载器处理后重写的url路径，打包之后图片也会被复制到dist的该路径中
            }
        }]
    },
    optimization: {
      runtimeChunk: {
          name: "manifest"
      },
      splitChunks: {
          cacheGroups: {
              commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: "vendor",
                  chunks: "all"
              }
          }
      }
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin('build/*.*', {
          root: __dirname,
          verbose: true,
          dry: false
        })
    ],
};