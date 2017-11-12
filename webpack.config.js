module.exports = {
  entry: {
    home: './src/home/homeClient.js',
    search: './src/search/searchClient.js',
    vehicle: './src/vehicle/vehicleClient.js'
  },
  devtool: 'cheap-module-eval-source-map',
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
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [['babel-plugin-styled-components', {'ssr': true}]]
          }
        }
      }
    ]
  }
}
