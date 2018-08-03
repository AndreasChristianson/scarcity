import {Pool} from 'pg';

import route from './pg-route';

export default {
    name: 'scarcity-pg',
    version: '1.0.0',
    register: (server) => {
        const pg = new Pool();

        server.decorate('toolkit', 'pg', pg);
        server.decorate('server', 'pg', pg);

        server.route(route);
    }
};
