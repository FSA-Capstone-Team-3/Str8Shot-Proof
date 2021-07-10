let dotenvPlugin;
if (process.env.DEPLOY) {
  const Dotenv = require('dotenv-webpack');
  dotenvPlugin = new Dotenv();
} else {
  dotenvPlugin = null;
}

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  plugins: [dotenvPlugin],
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
