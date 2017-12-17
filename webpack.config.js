const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: ['react-hot-loader/webpack', 'babel-loader']
		},
		{
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
    }
   ]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}
		})
	]
};