export default ({
    method: 'GET',
    path: '/healthz',
    handler: function (request, h) {
        return h.response(request.server.info).code(200);
    }
});
