var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/memory.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ["", ".js", ".jsx" ]
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
