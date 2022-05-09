const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      //...
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
          {
            loader: '@svgr/webpack',
            options: {
              native: true,
            },
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
          }
        ],
      },
    ],
  },
  
  //...
};