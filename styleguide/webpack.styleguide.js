const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /styleguide\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        exclude: /styleguide\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|ico|jpg|jpeg|png|gif)$/,
        use: 'file-loader?name=public/[name].[ext]'
      },
    ]
  },
};