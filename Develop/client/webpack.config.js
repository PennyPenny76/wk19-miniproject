const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// const { GenerateSW } = require('workbox-webpack-plugin');




module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js'
    },
    devServer: {
      hot: 'only',
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true, 
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Contact Cards',
      }),

      new MiniCssExtractPlugin({
          filename: '[name].css', 
      }),
      
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }), 
      // new GenerateSW(),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'NAMECARDs',
        short_name: 'NAMECARDs',
        description: 'Keep contacts with important persons!',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    // TODO: Add the correct modules
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    }
  };
};
