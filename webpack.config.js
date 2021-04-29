const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', '/src/index.tsx'],
  output: {
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[fullhash:8].map',
    chunkFilename: '[id].[fullhash:8].js',
    path: path.resolve(__dirname, '/dist/'),
    publicPath: '/'
  },
  devServer: {
    publicPath: "/",
    contentBase: "/public",
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  optimization: {
    runtimeChunk: {
      name: 'runtime', // necessary when using multiple entrypoints on the same page
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', {},],
                ],
              },
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader?limit=10000&name=img/[name].[ext]'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack'
          },
          {
            loader: 'url-loader'
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/public/index.html',),
      filename: 'index.html',
      inject: 'body'
    }),
    new WebpackManifestPlugin({
      fileName: '/public/manifest.json',
      generate: (seed, files) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        const entrypointFiles = files.filter(x => x.isInitial && !x.name.endsWith('.map')).map(x => x.path);

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
  ]
};