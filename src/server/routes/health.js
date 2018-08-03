export default ({
    method: 'GET',
    path: '/healthz',
    handler: (request, h) => h.response('ok').code(200),
    options: {
        tags: ['do not log'],
        auth: false
    }
});
