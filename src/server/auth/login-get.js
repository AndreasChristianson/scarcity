export default {
    method: 'GET',
    path: '/login',
    handler: (request, h) => h.response(request.auth.credentials)
};
