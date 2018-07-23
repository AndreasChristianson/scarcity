export default ({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: {
            path: './dist/public',
            listing: false,
            index: true
        }
    }
});
