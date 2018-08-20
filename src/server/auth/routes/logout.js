import logger from '../../../logger';

export default {
    method: ['POST'],
    path: '/api/auth/logout',
    handler: (request, h) => {
        const {auth: {credentials}} = request;

        if (!credentials) {
            return h.response({
                message: 'Not currently logged in',
                user: {}
            });
        }

        const {user} = credentials;

        request.cookieAuth.clear();

        logger.debug('Cleared auth cookie', {user});

        return h.response({
            message: 'Logged out',
            user: {}
        });
    },
    options: {
        auth: {mode: 'try'}
    }
};
