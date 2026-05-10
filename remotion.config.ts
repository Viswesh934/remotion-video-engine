import { Config } from "@remotion/cli/config";
import { WebpackOverrideFn } from "@remotion/bundler";

// Output settings
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");

// Webpack overrides
const webpackOverride: WebpackOverrideFn = (currentConfiguration) => {
	return {
		...currentConfiguration,
		module: {
			...currentConfiguration.module,
			rules: [
				...(currentConfiguration.module?.rules ?? []).filter((rule) => {
					// Remove existing CSS rules to avoid conflicts
					if (typeof rule === 'object' && rule && 'test' in rule) {
						return !rule.test?.toString().includes('css');
					}
					return true;
				}),

				// CSS Modules - must come before regular CSS
				{
					test: /\.module\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[name]__[local]--[hash:base64:5]',
								},
								importLoaders: 1,
							},
						},
					],
				},

				// Regular CSS
				{
					test: /\.css$/,
					exclude: /\.module\.css$/,
					use: ['style-loader', 'css-loader'],
				},

				// Fonts
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
					generator: {
						filename: "fonts/[name][ext]",
					},
				},

				// Images
				{
					test: /\.(png|jpg|jpeg|gif|svg)$/i,
					type: "asset/resource",
					generator: {
						filename: "images/[name][ext]",
					},
				},

				// Audio
				{
					test: /\.(mp3|wav|ogg|m4a)$/i,
					type: "asset/resource",
					generator: {
						filename: "audio/[name][ext]",
					},
				},
			],
		},
	};
};

Config.overrideWebpackConfig(webpackOverride);