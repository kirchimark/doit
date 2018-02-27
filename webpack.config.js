const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-2'],
        plugins: ['react-html-attrs' , 'transform-class-properties', 'transform-decorators-legacy']
      }
},
    {  test: /\.css$/,
        use: [
            {loader: "style-loader"},
            {loader: "css-loader"}
        ]},
        {
         test: /\.less$/, 
         use: [
             {loader: "style-loader"},
             {loader: "css-loader"},
             {loader: "less-loader"},
         ]
        }
    ],
  }
}