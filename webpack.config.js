const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "style.min.css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'public', 'build'),
		publicPath: '/build/',
		filename: 'bundle.js'
	},
	devtool: NODE_ENV === 'development' && 'eval-source-map',
	watch: NODE_ENV === 'development',
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
          loader: "babel-loader"
        }
		},
		{
			test: /\.scss$/,
			use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
              })
		}
 ]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}
		}),
		extractSass
	]
};