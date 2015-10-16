///https://ruby-china.org/topics/27537

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = module.exports = {
  // 'context' sets the directory where webpack looks for module files you list in
  // your 'require' statements
  context: __dirname,

  // 'entry' specifies the entry point, where webpack starts reading all
  // dependencies listed and bundling them into the output file.
  // The entrypoint can be anywhere and named anything - here we are calling it
  // '_application' and storing it in the 'javascripts' directory to follow
  // Rails conventions.

  //要module化的js，裡面有不少dependency
  entry: ['./app/frontend/javascripts/entry.js']
}

config.output = {
  path: path.join(__dirname, 'app', 'assets', 'javascripts'),
  filename: 'bundle.js',
  //http load 的時候的path,rails裡面是.../assets/...
  publicPath: '/assets'
}

///後綴的省略，在require的時後
config.resolve = {
  extensions: ['', '.js', '.css', '.scss']
}

config.module = {
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules')
    },

    { test: /\.jsx$/, loader: 'jsx-loader' },
    {
      test: /\.css$/,
      loaders: ['style', 'css']
    }
  ]
}

//注入一些共通的library, value 是call 此library的方式
config.plugins = [
  new webpack.ProvidePlugin(
    {$: "jquery"}
  )
];
