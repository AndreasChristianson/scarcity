module.exports = {
    mode: 'development',
    entry: ['./src/components/Main.js'],
    output: {
        path: require('path').join(__dirname, 'dist/public/js'),
        filename: 'app.built.js'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }]
    }
};
