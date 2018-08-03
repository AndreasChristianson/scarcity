export default {
    method: 'GET',
    path: '/login',
    handler: (request, h) => h.response({
        user: request.auth.credentials.user
    })
};
