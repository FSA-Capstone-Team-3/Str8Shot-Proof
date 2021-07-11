const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

// create object of env variables
let envVars;
if (env) {
  envVars = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
} else {
  envVars = Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});
}

// let dotenvPlugin;
// if (process.env.DEPLOY) {
//   const Dotenv = require('dotenv-webpack');
//   dotenvPlugin = new Dotenv();
// } else {
//   dotenvPlugin = null;
// }

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  plugins: [new webpack.DefinePlugin(envVars)],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.geojson?$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg/,
        exclude: /node_modules/,
        type: 'asset/inline',
      },
    ],
  },
};
