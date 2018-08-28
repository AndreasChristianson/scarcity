import bcrypt from 'bcryptjs';

import pg from '../../pg/pg';
import logger from '../../../logger';

const resetExpiration = 24 * 60 * 60 * 1000;

const isValid = (nonce) => {
    if (!nonce) {
        logger.debug('Nonce not found.');

        return false;
    } else if (nonce.used) {
        logger.debug(`Nonce #${nonce.id} was already used.`);

        return false;
    } else if (nonce.stamp.valueOf() + resetExpiration < Date.now().valueOf()) {
        logger.debug(`Nonce #${nonce.id} is expired (was issued ${nonce.stamp}).`);

        return false;
    }

    logger.debug(`Nonce #${nonce.id} found and is valid.`);

    return nonce;
};

const validateNonce = async (nonceString) => {
    const {rows: [nonce]} = await pg.query(
        `select * from password_reset_nonce 
            where nonce = $1`,
        [nonceString]
    );

    return isValid(nonce);
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
    logger.debug(`Password for user #${userId} updated.`);
};

const consumeNonce = async (nonceId) => {
    const {rowCount} = await pg.query(
        `update password_reset_nonce 
            set used = $1
            where id = $2`,
        [true, nonceId]
    );

    shouldUpdateOneRecord(rowCount);
    logger.debug(`Nonce #${nonceId} consumed.`);
};

export default {
    validateNonce,
    updatePassword,
    consumeNonce
};

