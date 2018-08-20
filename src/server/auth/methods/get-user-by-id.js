import config from 'config';

import pg from '../../pg/pg';

const getUserById = async (userId) => {
    const {rows: [user]} = await pg.query(
        'SELECT * from scarcity_users where id = $1',
        [userId]
    );

    return user;
};

export default {
    name: 'getUserById',
    method: getUserById,
    options: {
        cache: {
            expiresIn: config.get('server.auth.lockedAccountCacheTime'),
            generateTimeout: config.get('server.options.generateTimeout')
        }
    }
};
