export default ({
    method: 'GET',
    path: '/healthz',
    handler: function (request, h) {
        return h.response('ok').code(200);
    }
});
