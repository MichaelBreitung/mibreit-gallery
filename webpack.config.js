var path = require('path');

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'mibreit-gallery'),
    filename: 'mibreitGallery.js',
    library: 'mibreitGallery',
    libraryTarget: 'var'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["babel-preset-stage-0"].map(require.resolve)
        }
      }
    }]
  },
  externals: {
    jquery: 'jQuery'
  }
};