import pg from '../../pg/pg';

export default async (user) => {
    try {
        await pg.query(
            'insert into scarcity_users(name, email, hash) VALUES($1, $2, $3)',
            [user.name, user.email, user.hash]
        );

        return {
            ok: true,
            message: 'User added'
        };
    } catch (error) {
        return {
            ok: false,
            message: `Unable to create user: ${error.message}`
        };
    }
};
