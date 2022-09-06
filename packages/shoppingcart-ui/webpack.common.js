const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const workspaceDir = path.resolve(__dirname)
const config = (isDevMode = true) => {
  return ({
    context: workspaceDir,
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-react', '@babel/preset-typescript']
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: true
              }
            }, 
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss']
    },
    entry: {
      'shoppingcart-ui': './src/index.tsx'
    },
    output: {
      filename: 'ui/[name].min.js',
      chunkFilename: 'ui/[name].chunk.js',
      publicPath: '/',
      path: path.join(__dirname, '/build') + '/public'
    },
    target: 'node',
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'public' }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[id].css"
      })
    ]
  })
}

module.exports = config
