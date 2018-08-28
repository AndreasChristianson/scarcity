import pg from '../../pg/pg';

export const lookupUserByName = async (username) => {
    const {rows: [user]} = await pg.query(
        'SELECT * from scarcity_users where name = $1',
        [username]
    );

    return user;
};

export const lookupUserByEmail = async (email) => {
    const {rows: [user]} = await pg.query(
        'SELECT * from scarcity_users where email = $1',
        [email]
    );

    return user;
};

export default async (nameOrEmail) => {
    const namePromise = lookupUserByName(nameOrEmail);
    const emailPromise = lookupUserByEmail(nameOrEmail);
    const userByName = await namePromise;
    const userByEmail = await emailPromise;

    return userByName || userByEmail;
};
