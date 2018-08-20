import crypto from 'crypto';

import pg from '../../pg/pg';

export default async (userId) => {
    const nonce = crypto.randomBytes(25).toString('hex');

    await pg.query(
        'insert into password_reset_nonce(user_id,nonce) VALUES($1, $2)',
        [userId, nonce]
    );

    return nonce;
};
