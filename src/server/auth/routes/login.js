import bcrypt from 'bcryptjs';
import Joi from 'joi';

import lookupUser from '../methods/lookup-user';

const sessionDuration = 24 * 60 * 60 * 1000;

// a default hash allows us to run bcrypt.compare even when the user is not found; this prevents timing attacks.
const defaultHash =
    '$2a$11$zNdLMT5CPVwXVP0THh.lXunzQNmJDiY0ynecPZs2EPQksnBvvNIWy';

const validatePassword = async (user, password) => {
    const hash = user ? user.hash : defaultHash;
    const match = await bcrypt.compare(password, hash);

    return user && match;
};

const validPassword = async (user, request, h) => {
    const {payload: {password, username}} = request;

    if (!await validatePassword(user, password)) {
        const message = 'Invalid username or password.';

        request.log('debug', `Invalid login attempt for user: [${username}]`);

        return h.response({message}).code(401);
    }

    request.log('silly', `Password valid for [${username}]`);

    return false;
};

const unlockedAccount = ({locked}, request, h) => {
    const {payload: {username}} = request;

    if (locked) {
        const message = 'Account locked.';

        request.log('debug', `Attempt to access locked user: [${username}]`);

        return h.response({message}).code(401);
    }

    request.log('silly', `Account valid for [${username}]`);

    return false;
};

const nonExpiredPassword = ({expired_password: expired}, request, h) => {
    const {payload: {username}} = request;

    if (expired) {
        const message = 'Password reset required.';

        request.log('silly', 'Password expired. Please reset your password.');

        return h.response({
            message
        }).code(401);
    }

    request.log('silly', `Password current for [${username}]`);

    return false;
};

const successfulLogin = ({id, name, email, scope, stamp: created}, request, h) => {
    const credentials = {
        user: {
            id,
            name,
            email,
            created,
            sessionIssued: new Date().toISOString()
        },
        scope,
        exp: Date.now().valueOf() + sessionDuration
    };

    request.cookieAuth.set(credentials);
    request.log('silly', `Logged in [${name} (${id})]`);
    const message = 'Successfully logged in.';

    return h.response({
        user: credentials.user,
        message
    });
};

const loginFilters = [
    validPassword,
    unlockedAccount,
    nonExpiredPassword,
    successfulLogin
];

const handler = async (request, h) => {
    const {username} = request.payload;

    request.log('silly', `Looking up user: ${username}`);
    const user = await lookupUser(username);

    request.log('silly', ['Found', user]);

    let ret = false;

    for (const filter of loginFilters) {
        ret = ret || await filter(user, request, h);
    }

    return ret;
};

export default {
    method: 'POST',
    path: '/api/auth/login',
    options: {
        auth: {mode: 'try'},
        validate: {
            payload: {
                username: Joi.string().required(),
                password: Joi.string().required()
            }
        }
    },
    handler
};
