const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

const workspaceDir = path.resolve(__dirname)
const config = {
  context: workspaceDir,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use:  {
            loader: require.resolve('babel-loader'),
            options: {
                presets: ['@babel/preset-react']
            }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js']
  },
  entry: {
    'shoppingcart-server': './server/app.js'
  },
  output: {
    filename: '[name].min.js',
    path: workspaceDir + '/build'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'server/views', to: 'public/views' }
      ],
    })
  ],
  target: 'node'
}

module.exports = config
