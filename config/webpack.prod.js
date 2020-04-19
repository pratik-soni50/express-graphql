const paths = require('./paths');

var rules = [
  {
    test: /\.(js|mjs)$/,
    exclude: /(node_modules|bower_components)/,
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
