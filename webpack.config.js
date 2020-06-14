module.exports = {
  context: __dirname + '/src',
  entry: {
    index: './index.js',
  },
  output: {
    path: __dirname + '/js',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  }
};
