///tutor & change
///https://ruby-china.org/topics/27537

//gulp & webpack
//http://aergonaut.com/rails-4-gulp-webpack-react/

//入門教學
//http://segmentfault.com/a/1190000002551952

//webpack -wc (w: watch c: color)
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = module.exports = {
  // 'context' sets the directory where webpack looks for module files you list in
  // your 'require' statements
  //找檔案的root path
  context: __dirname,

  // 'entry' specifies the entry point, where webpack starts reading all
  // dependencies listed and bundling them into the output file.
  // The entrypoint can be anywhere and named anything - here we are calling it
  // '_application' and storing it in the 'javascripts' directory to follow
  // Rails conventions.

  //要module化的js，裡面有不少dependency
  entry: {
    main: ['./app/frontend/javascripts/entry.js'],
    local: ['./app/frontend/javascripts/entry2.js', './app/frontend/javascripts/entry3.js'],
    main_css: "./app/frontend/stylesheets/main"
  }
}
//
config.output = {
  path: path.join(__dirname, 'app', 'assets', 'javascripts'),
  filename: '[name]_bundle.js',
  //non entry 的chunk會以此來輸出
  chunkFilename: '[id].js',
  //http load 的時候的path,rails裡面是.../assets/...
  publicPath: '/assets'
}

///後綴的省略，在require的時後
config.resolve = {
  extensions: ['', '.js', '.css', '.scss']
}

//在js裡面import不同類型檔案要使用loader讓他轉譯
config.module = {
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules')
    },

    { test: /\.jsx$/, loader: 'jsx-loader' },
    //普通insert到header版
    // {
    //   test: /\.css$/,
    //   loaders: ['style', 'css']
    // }
    //使用ExtractTextPlugin產生css檔案
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("css-loader")
    }
  ]
}

//注入一些共通的library, value 是call 此library的方式
config.plugins = [
  new webpack.ProvidePlugin(
    {$: "jquery"}
  ),
  //移到stylesheets裡面
  new ExtractTextPlugin("../stylesheets/[name].css", {allChunks: true})
];
