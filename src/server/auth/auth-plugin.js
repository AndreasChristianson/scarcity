import config from 'config';

import hapiAuthCookie from 'hapi-auth-cookie';

import authenticate from './authenticate-request';
import logout from './logout-route';
import loginGet from './login-get';
import loginPost from './login-post';
import lookupUser from './lookup-user';

export default {
    name: 'auth',
    version: '1.0.0',
    register: async (server) => {
        await server.register(hapiAuthCookie);

        server.auth.strategy('session', 'cookie', {
            cookie: config.get('server.auth.cookieName'),
            password: config.get('server.auth.cookiePassword'),
            isSecure: config.get('server.auth.useSecureCookies'),
            isHttpOnly: false,
            validateFunc: authenticate,
            clearInvalid: true
        });

        server.auth.default('session');
        server.route([logout, loginGet, loginPost]);

        server.method({
            name: 'getUser',
            method: lookupUser,
            options: {
                cache: {
                    generateTimeout: config.get('server.options.generateTimeout')
                }
            }
        });
    }
};
