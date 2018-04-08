module.exports = {
	watch: false,
	entry: './index.js',
	context: __dirname + '/src',
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
					failOnError: true,
				}
			},
			{
				loader: "babel-loader",
				test: /\.js$/,
				exclude: /node_modules/,
				options: {
					presets: ["es2015","react"],
					plugins: ["transform-object-rest-spread"]
				}
			}
		]
	},
	resolve: {
		modules: ['node_modules','src'],
	  extensions: ['.js', '.jsx']
	},
	output: {
	  path: __dirname + '/public',
	  filename: 'bundle.js'
	},
	devServer: {
		historyApiFallback: true,
	  inline: true,
	  host: 'vps-develop',
	  watchContentBase: true,
	  contentBase: './public',
	  port: 5000,
	  progress: true,
	  watchOptions: {
		poll: 1000
	  }
	}
  };
  