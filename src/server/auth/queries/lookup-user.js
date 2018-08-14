export default (server) => async (username) => {
    const {rows} = await server.pg.query(
        'SELECT * from scarcity_users where name = $1',
        [username]
    );

    return rows[0];
};
