const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CnameWebpackPlugin = require('cname-webpack-plugin')

module.exports = (env, argv) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ]

  const productionPlugins = [new CnameWebpackPlugin({ domain: 'www.jasonvictorio.com' }), new CleanWebpackPlugin()]

  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: `${__dirname}/dist`,
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
            },
          ],
        },
      ],
    },
    plugins: argv.mode === 'production' ? plugins.concat(productionPlugins) : plugins,
  }
}
