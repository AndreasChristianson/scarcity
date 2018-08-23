export default {
    method: 'GET',
    path: '/api/auth/user',
    handler: ({auth: {credentials}}, h) => {
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
