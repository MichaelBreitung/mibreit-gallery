var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = [{
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
  },
  {
    mode: "production",
    entry: './src/styles.js',
    output: {
      path: path.resolve(__dirname, 'mibreit-gallery/css')
    },
    module: {
      rules: [{
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              url: false
            }
          }]
        })
      }]
    },
    plugins: [
      new ExtractTextPlugin("mibreitGallery.css"),
    ]
  }
];