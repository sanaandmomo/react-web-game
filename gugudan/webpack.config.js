const path = require('path');
const webpack = require('webpack');

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
                                    browsers: ['> 5% in KR', 'last 2 chrome versions'],
                                },
                                debug: true
                            }
                        ], 
                        ['@babel/preset-react']
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }
};