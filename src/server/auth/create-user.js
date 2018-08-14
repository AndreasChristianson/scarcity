import bcrypt from 'bcryptjs';
import Joi from 'joi';

const handler = async (request, h) => {
    const {password, ...user} = request.payload;

    user.hash = await bcrypt.hash(password, 11);

    const {message, ok, conflict} = await request.server.methods.createUser(user);

    if (ok) {
        return h.response({message}).code(201);
    }

    if (conflict) {
        return h.response({message}).code(409);
    }

    return h.response({message}).code(500);
};

export default {
    method: 'POST',
    path: '/api/create-user',
    options: {
        auth: {mode: 'try'},
        validate: {
            payload: {
                name: Joi.string().required().regex(/^[a-z0-9_]{5,}$/),
                email: Joi.string().required(),
                password: Joi.string().required().min(5)
            }
        }
    },
    handler
};
