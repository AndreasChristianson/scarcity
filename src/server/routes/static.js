export default [{
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: {
            path: './dist/public',
            listing: false,
            index: true
        }
    },
    options: {
        tags: ['do not log'],
        auth: false
    }
}, {
    method: 'GET',
    path: '/page/{path*}',
    handler: {
        file: () => './dist/public/index.html'
    },
    options: {
        tags: ['do not log'],
        auth: false
    }
}];
