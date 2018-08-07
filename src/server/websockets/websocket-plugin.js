import config from 'config';

import nes from 'nes';
import Multines from 'multines';

import route from './test-route';

export default {
    name: 'scarcity-websocket',
    version: '1.0.0',
    register: async (server) => {
        server.route(route);
        const multines = {
            plugin: {
                name: 'multines',
                register: Multines.register
            },
            options: {
                type: 'redis',

                port: 6379,
                host: config.get('redis.host')
            }
        };

        await server.register([nes, multines]);

        server.subscriptionFar('/item/{id}/info');
        server.route({
            path: '/item/{id}/info',
            method: 'GET',
            handler: async (req, h) => {
                req.log('trace', `Example Id is ${req.params.id}`);
                await server.publishFar(`/item/${req.params.id}/info`, server.info.id);

                return h.response(server.info.id);
            }
        });

        server.subscription('/server/time', {
            auth: {
                scope: ['can-listen-to-time']
            }
        });
        
        server.events.on('start', () => {
            setInterval(() => server.publish('/server/time', new Date()), 500);
            setInterval(() => server.broadcast(new Date()), 15000);
        });
    }
};
