import logger from '../../logger';

export default {
    method: 'GET',
    path: '/logout',
    handler: (request, h) => {
        const {auth: {credentials: {user}}} = request;

        request.cookieAuth.clear();

        logger.debug('Cleared auth cookie', {user});

        const message = 'Logged out';

        return h.response({
            message,
            user
        });
    }
};
