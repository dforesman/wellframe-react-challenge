var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        exclude: /node_modules/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
          "presets" : ["es2015", "react"],
          "plugins": ["transform-object-rest-spread"]
        }
      }
    ]
  },

  resolve: {
    root: APP_DIR,
    extensions: ['','.js','.jsx'],
    modulesDirectories: ['node_modules', 'actions', 'containers', 'reducers', 'components']
  }
};

module.exports = config;