import bcrypt from 'bcryptjs';
import Joi from 'joi';

import createUser from '../methods/create-user';

const handler = async ({payload: {password, ...user}}, h) => {
    const hash = await bcrypt.hash(password, 11);

    const {message, ok} = await createUser({
        hash,
        ...user
    });

    if (ok) {
        return h.response({message}).code(201);
    }

    return h.response({message}).code(400);
};

export default {
    method: 'POST',
    path: '/api/auth/create-user',
    options: {
        auth: {mode: 'try'},
        validate: {
            payload: {
                name: Joi.string().required().regex(/^[a-z0-9_]{5,}$/),
                email: Joi.string().email().required(),
                password: Joi.string().required().min(5)
            }
        }
    },
    handler
};
