import pg from '../../pg/pg';

export default async (username) => {
    const {rows} = await pg.query(
        'SELECT * from scarcity_users where name = $1',
        [username]
    );

    return rows[0];
};
