const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './public/app/app.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015'],
      },
    },
     { test: /\.css$/, loader: 'style-loader!css-loader' },
     { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
    ] },
  devServer: {
    contentBase: './build',
    inline: true,
    hot: true,
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.jsx', '.css', '.scss'],
  },
};
