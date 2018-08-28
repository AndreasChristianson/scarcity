import Joi from 'joi';

import changePassword from '../methods/change-password';

const handler = async ({auth: {credentials}, payload: {password, nonce}}, h) => {
    const validNonce = await changePassword.validateNonce(nonce);

    if (validNonce) {
        await changePassword.updatePassword(validNonce.user_id, password);
        await changePassword.consumeNonce(validNonce.id);
        const message = 'Password changed. Reset link consumed.';

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
    path: '/api/auth/change-password',
    options: {
        auth: {
            mode: 'try'
        },
        validate: {
            payload: {
                nonce: Joi.string().hex().length(50),
                password: Joi.string().required().min(5)
            }
        }
    },
    handler
};
