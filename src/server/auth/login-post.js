import crypto from 'crypto';

import bcrypt from 'bcrypt';
import Joi from 'joi';

// a default hash allows us to run bcrypt.compare even when the user is not found; this prevents timing attacks.
const defaultHash = '$2a$11$zNdLMT5CPVwXVP0THh.lXunzQNmJDiY0ynecPZs2EPQksnBvvNIWy';

const validatePassword = async (user, password) => {
    const hash = user ? user.hash : defaultHash;
    const match = await bcrypt.compare(password, hash);

    return user && match;
};

const handler = async (request, h) => {
    const {username, password} = request.payload;

    const user = await request.server.methods.getUser(username);
    const isValid = await validatePassword(user, password);

    if (!isValid) {
        const message = 'Invalid username or password.';

        return h.response({message}).code(403);
    }

    const credentials = {
        user: {
            id: user.id,
            name: user.name
        },
        scope: user.scope
    };
    const sid = crypto.randomBytes(8).toString('hex');

    await request.server.plugins.auth.sessionCache.set(sid, credentials, 0);

    request.cookieAuth.set({sid});
    const message = 'Successfully logged in.';

    return h.response({
        ...credentials,
        message
    });
};

export default {
    method: 'POST',
    path: '/login',
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
