import bcrypt from 'bcryptjs';

import pg from '../../pg/pg';

const resetExpiration = 24 * 60 * 60 * 1000;

const isValid = (nonce) => nonce &&
    !nonce.used &&
    nonce.stamp.valueOf() + resetExpiration > Date.now().valueOf();

const validateNonce = async (userId, nonceString) => {
    const {rows: [nonce]} = await pg.query(
        `select * from password_reset_nonce 
            where user_id = $1 
            and nonce = $2`,
        [userId, nonceString]
    );

    if (isValid(nonce)) {
        return nonce.id;
    }

    return false;
};

const shouldUpdateOneRecord = (rowCount) => {
    if (rowCount !== 1) {
        throw new Error('Record not updated');
    }
};

const updatePassword = async (userId, password) => {
    const hash = await bcrypt.hash(password, 11);

    const {rowCount} = await pg.query(
        `update scarcity_users 
            set hash = $1
            where id = $2`,
        [hash, userId]
    );

    shouldUpdateOneRecord(rowCount);
};

const consumeNonce = async (nonceId) => {
    const {rowCount} = await pg.query(
        `update password_reset_nonce 
            set used = $1
            where id = $2`,
        [true, nonceId]
    );

    shouldUpdateOneRecord(rowCount);
};

export default {
    validateNonce,
    updatePassword,
    consumeNonce
};

