import Joi from 'joi';

import {lookupUserByEmail} from '../methods/lookup-user';
import addPasswordResetNonce from '../methods/add-password-reset-nonce';
import sendResetEmail from '../methods/send-reset-email';

const handler = async (request, h) => {
    const {payload: {email}} = request;
    const user = await lookupUserByEmail(email);

    if (user) {
        const nonce = await addPasswordResetNonce(user.id);

        request.log('silly', `Added pw reset nonce [${nonce}] for user ${user.name}(${user.id}).`);
        sendResetEmail(user, nonce);
    }

    const message = `Reset email sent to ${email}`;

    return h.response({message}).code(200);
};

export default {
    method: 'POST',
    path: '/api/auth/reset-password',
    options: {
        auth: {mode: 'try'},
        validate: {
            payload: {
                email: Joi.string().email().required()
            }
        }
    },
    handler
};
