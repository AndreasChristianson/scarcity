const nes = require('nes');

import route from './test-route';

export default {
    name: 'scarcity-websocket',
    version: '1.0.0',
    register: async (server) => {
        server.route(route);
        await server.register(nes);
    }
};
