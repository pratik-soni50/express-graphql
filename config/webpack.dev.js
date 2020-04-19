const paths = require('./paths');

var rules = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      }
    }
  },
];

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: paths.appPath + '/server.js',
  },
  output: {
    filename: '[name].js',
    path: paths.appBuild,
    pathinfo: false
  },
  performance: {
    hints: 'warning'
  },
  optimization: {
    namedModules: false,
    namedChunks: false,
    nodeEnv: 'development',
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
