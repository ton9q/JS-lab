const path = require('path')
const TSLintPlugin = require('tslint-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=[name].[ext]'
      },
    ],
  },

  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts'],
    }),

    new HtmlWebPackPlugin({
      favicon: './public/favicon.ico',
      template: './public/index.html',
      filename: './index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    inline: true,
    port: 1902,
    hot: true,
  },
}
