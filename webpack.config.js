///https://ruby-china.org/topics/27537

var path = require('path');
var webpack = require('webpack');
var config = module.exports = {
  // 'context' sets the directory where webpack looks for module files you list in
  // your 'require' statements
  context: __dirname,

  // 'entry' specifies the entry point, where webpack starts reading all
  // dependencies listed and bundling them into the output file.
  // The entrypoint can be anywhere and named anything - here we are calling it
  // '_application' and storing it in the 'javascripts' directory to follow
  // Rails conventions.
  entry: './app/frontend/javascripts/entry.js'
}

config.output = {
  path: path.join(__dirname, 'app', 'assets', 'javascripts'),
  filename: 'bundle.js',
  //http load 的時候的path,rails裡面是.../assets/...
  publicPath: '/assets'
}

///後綴的省略，在require的時後
config.resolve = {
  extensions: ['', '.js']
}

config.module = {
  loaders: [
    { test: /\.jsx$/, loader: 'jsx-loader' }
  ]
}

