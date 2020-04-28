const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');

var rules = [
  {
    test: /\.(js|mjs)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      }
    }
  }, {
    test: /\.js$/,
    loader: 'strip-loader?strip[]=console.log,strip[]=console.error',
  },
];

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    index: ['core-js/stable', 'regenerator-runtime/runtime', paths.appSrc + '/index.js'],
  },
  output: {
    filename: '[name].js',
    path: paths.appBuild,
    pathinfo: false
  },
  performance: {
    hints: 'warning'
  },
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    namedModules: false,
    namedChunks: false,
    nodeEnv: 'production',
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true,
  },
  module: { rules },
};
