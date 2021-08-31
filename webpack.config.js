// Faz referência ao caminho absoluto
const path = require('path');
// Faz a geração de html automaticamente
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Ponto de Entrada do arquivo principal app.js
  entry: './app/src/js/app.js',
  output: {
    filename: 'bundle.js',
    // __dirname pega o diretório atual do projeto e concatena com o valor passado
    path: path.resolve(__dirname, 'app/dist'),
    //Limpa a pasta dist
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader permite o import do css, já o style-loader carrega no app.
        // use: ['style-loader', 'css-loader'],
        // Utliza o loader para separar os módulos css
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  // Quando se trata de uma otimização impactante, usamos o optimization
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      // Remove o comportamento padrão de minificação do webpack
      '...',
    ],
  },
  // Seção de plugins webpack
  plugins: [
    new HtmlWebpackPlugin({
      // Indica o caminho do arquivo html
      template: './app/src/app.html',
      filename: 'app.html',
      // Invalida o cache
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    // Concatenação dos módulos webpack
    new webpack.optimize.ModuleConcatenationPlugin(),

    // new CopyWebpackPlugin({
    //   patterns: [{ from: './app/src/css', to: 'css' }],
    // }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
  },
};
