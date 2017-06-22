const path = require('path');
const SvgStore = require('webpack-svgstore-plugin');
const svgoConfig = require('../svgo.config');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /(styleguide\.css$|node_modules\/.*\.css$)/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /(styleguide\.css$|node_modules)/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|ico|jpg|jpeg|png|gif)$/,
        use: 'file-loader?name=lib/[name].[ext]',
      },
    ],
  },
  plugins: [
    new SvgStore({
      prefix: 'fc-icon-',
      svgoOptions: svgoConfig,
    }),
  ],
};
