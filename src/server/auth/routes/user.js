export default {
    method: 'GET',
    path: '/api/auth/user',
    handler: (request, h) => {
        const {auth: {credentials}} = request;

        const user = credentials ? credentials.user : {};

        return h.response({
            user,
            message: credentials ?
                'Currently logged in' :
                'Not logged in'
        });
    },
    options: {
        auth: {mode: 'try'}
    }
};
