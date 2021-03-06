const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  node: {
    __filename: false,
    __dirname: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@declares': path.resolve('./src/declares'),
      '@configs': path.resolve('./src/configs'),
      '@decorators': path.resolve('./src/decorators'),
      '@filters': path.resolve('./src/filters'),
      '@guards': path.resolve('./src/guards'),
      '@interceptors': path.resolve('./src/interceptors'),
      '@middlewares': path.resolve('./src/middlewares'),
      '@modules': path.resolve('./src/modules'),
      '@pipes': path.resolve('./src/pipes'),
      '@services': path.resolve('./src/services'),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname,'./src/modules/auth/*.pem'),
        to: path.join(__dirname, 'dist'),
        flatten: true,
      },
      {
        from: path.join(__dirname, './src/**/*.html'),
        to: path.join(__dirname, 'dist'),
        flatten: true,
      },
    ], {
      copyUnmodified: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['*.hot-update.js', '*.hot-update.json'],
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
