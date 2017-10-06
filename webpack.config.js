const webpack = require('webpack');
var SRC_DIR = __dirname + '/client/src';
var DIST_DIR = __dirname + '/client/dist';

const environment = process.env.NODE_ENV;
const envPath = '.env.' + environment;
const envVars = require('dotenv').config({path: envPath});
console.log('the webpack is in this env', environment)

module.exports = {
  entry: {
    main: `${SRC_DIR}/index.jsx`,
    dashboard: `${SRC_DIR}/dashboard.jsx`
  },
  output: {
    filename: '[name].bundle.js',
    path: DIST_DIR
  },
  module: {
    loaders: [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      // allow webpack to add css files to build
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      // allow loading Bootstrap files
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      HOSTNAME: JSON.stringify(process.env.HOSTNAME)
    })
  ]
};
