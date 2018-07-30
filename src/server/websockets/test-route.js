export default [{
    method: 'GET',
    path: '/ws/test',
    config: {
        id: 'test',
        handler: (request, h) => {
            return 'test';
        }
    }
}];
