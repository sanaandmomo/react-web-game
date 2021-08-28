const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'gugudan',
    mode: 'development',
    devtool: 'eval', // service -> hidden-source-map
    resolve: {
        extensions: ['.jsx', '.js']
    },

    entry: {
        app: ['./client']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env', 
                            {
                                targets: {
                                    browsers: ['> 5% in KR', 'last 2 chrome versions'], // browserslist
                                },
                                debug: true
                            }
                        ], 
                        ['@babel/preset-react']
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        'react-refresh/babel'
                    ]
                }
            }
        ]
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/'
    },
    devServer: {
        publicPath: '/dist/',
        hot: true,
        historyApiFallback: true
    }
};