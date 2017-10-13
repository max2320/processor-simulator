var path = require('path');
var webpack = require('webpack');

var jsPath = path.resolve(__dirname, '/src/');
var destPath = path.resolve(__dirname, '/dist/');

module.exports = {
  entry: [
    path.resolve(jsPath, 'init.js'),
  ],
  output: {
    path: destPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.(s)css$/, exclude: /node_modules/, use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader'
      ]},
      { test: /\.js(x)?$/, exclude: /node_modules/, loaders: ['babel-loader'] }
    ]
  },
  externals: {
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
};