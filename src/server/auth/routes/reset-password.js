import Joi from 'joi';

import changePassword from '../methods/change-password';

const handler = async ({auth: {credentials}, payload: {password, nonce, id: userId}}, h) => {
    const validNonce = await changePassword.validateNonce(userId, nonce);

    if (validNonce) {
        await changePassword.updatePassword(userId, password);
        await changePassword.useNonce(validNonce);
        const message = 'Password changed.';

        return h.response({message}).code(200);
    } else if (credentials) {
        await changePassword.updatePassword(credentials.user.id, password);
        const message = 'Password changed.';

        return h.response({message}).code(200);
    }

    const message = 'Invalid nonce/cookie.';

    return h.response({message}).code(401);
};

export default {
    method: 'POST',
    path: '/api/reset-password',
    options: {
        auth: {
            mode: 'try'
        },
        validate: {
            payload: {
                nonce: Joi.string().hex().length(25),
                id: Joi.number(),
                password: Joi.string().required().min(5)
            }
        }
    },
    handler
};
