import config from 'config';

export default {
    method: 'GET',
    path: '/logout',
    handler: (request, h) => {
        request.server.plugins.auth.sessionCache.drop(
            request.state[config.get('server.auth.cookieName')].sid
        );
        request.cookieAuth.clear();

        return h.response();
    }
};
