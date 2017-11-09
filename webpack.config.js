module.exports = {
  entry: {
    home: './src/home/homeClient.js'
  },
  devtool: 'eval',
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
