const nes = require('nes');

import route from './test-route';

export default {
    name: 'scarcity-websocket',
    version: '1.0.0',
    register: async (server) => {
        server.route(route);
        await server.register(nes);
        server.subscription('/server/time');
        server.events.on('start',()=>{
          setInterval(()=> server.publish('/server/time', new Date()), 500);
        });
    }
};
