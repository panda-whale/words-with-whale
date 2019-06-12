const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: './bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(jsx)?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader'
          }
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
  },
  devServer: {
    historyApiFallback: {
      index: './index.html'
    },
    // port: 8080,
    proxy: {
      '/api': 'http://localhost:3000/',
      changeOrigin: true,
    },
    publicPath: '/build/',
  },
};
