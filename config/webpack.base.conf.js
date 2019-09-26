const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
}

module.exports = {
	externals: {
		paths: PATHS
	},
  entry: ['babel-polyfill', `${PATHS.src}/js/index.js`],
  output: {
    path: PATHS.dist,
		filename: `${PATHS.assets}js/[name].js`,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`
		}),
		new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
		}),
		new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`,	to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/fonts`,	to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`,	to: '' },
    ]),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					}, {
						loader: 'postcss-loader',
						options: { sourceMap: true, config: { path: './postcss.config.js' } }
					}, {
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: { sourceMap: true, config: { path: './postcss.config.js' }  }
					}
				]
			},
		]
	}
};