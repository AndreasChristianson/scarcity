import config from 'config';

import hapiAuthCookie from 'hapi-auth-cookie';

import authenticate from './authenticate-request';
import logout from './logout';
import login from './login';
import user from './user';
import lookupUser from './queries/lookup-user';
import createUserMethod from './queries/create-user';
import createUserRoute from './create-user';

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
        server.route([logout, login, user, createUserRoute]);

        server.method({
            name: 'getUser',
            method: lookupUser(server)
        });
        server.method({
            name: 'createUser',
            method: createUserMethod(server)
        });
    }
};
