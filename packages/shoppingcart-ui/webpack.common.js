const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

const workspaceDir = path.resolve(__dirname)
const config = {
  context: workspaceDir,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use:  {
            loader: require.resolve('babel-loader'),
            options: {
                presets: ['@babel/preset-react']
            }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            url: false
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx']
  },
  entry: {
    'shoppingcart-ui': './src/index.jsx'
  },
  output: {
    filename: 'ui/[name].min.js',
    chunkFilename: 'ui/[name].chunk.js',
    path: path.join(__dirname, '/build') + '/public',
    publicPath: '/'
  },
  target: 'node',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public' }
      ],
    })
  ],
}

module.exports = config
