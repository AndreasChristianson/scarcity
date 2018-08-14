export default (server) => async (user) => {
    try {
        await server.pg.query(
            'insert into scarcity_users(name, email, hash) VALUES($1, $2, $3)',
            [user.name, user.email, user.hash]
        );

        return {
            ok: true,
            message: 'User added'
        };
    } catch (error) {
        return {
            conflict: true,
            message: `Unable to create user: ${error.message}`
        };
    }
};
