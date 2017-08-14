const path = require('path')
const serve = require('serve')
const getPort = require('get-port')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const argv = require('yargs').argv

const exampleToRun = argv.run

const compiler = webpack({
  entry: {
    example: path.resolve(__dirname, 'example-wrapper')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        }),
      }
    ]
  },
  output: {
    filename: 'example.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      inject: 'head'
    }),
    new webpack.DefinePlugin({
      EXAMPLE_TO_SERVE: JSON.stringify(exampleToRun)
    })
  ]
})

compiler.run(function(err, stats) {
  if (err || stats.hasErrors()) {
    const errors = err || stats.toJson().errors
    throw new Error(errors)
  }

  getPort(3000).then(port => {
    serve(path.resolve(__dirname, 'dist'), {
      port: port
    })
  })
})
