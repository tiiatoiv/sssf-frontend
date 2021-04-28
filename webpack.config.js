{
    test: /\.(jpg|png|svg|gif)$/,
    loader: 'file-loader',
    options: {
           name: '[path][name].[ext]'
    }
},