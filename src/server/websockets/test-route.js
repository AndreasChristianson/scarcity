export default [{
    method: 'GET',
    path: '/ws/test',
    config: {
        id: 'server/time',
        handler: (request, h) => new Date()
    }
}];
