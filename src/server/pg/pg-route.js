export default ({
    method: 'GET',
    path: '/pg-test',
    handler: async (request, h) => {
        const {rows} = await h.pg.query('SELECT * from flyway_schema_history');

        return h.response(rows).code(200);
    }
});
