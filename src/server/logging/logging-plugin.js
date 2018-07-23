import good from 'good';

import AddSeverity from './append-severity-transform';
import AddEventTags from './append-event-tags-transform';
import Flag500s from './flag-500s-transform';
import FlagErrors from './flag-errors-transform';

const options = {
    reporters: {
        stdout: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                request: '*',
                error: '*',
                ops: '*',
                response: {
                    exclude: ['do not log']
                }
            }]
        },
        {
            module: 'good-errors'
        }, {
            module: AddEventTags
        }, {
            module: Flag500s
        }, {
            module: FlagErrors
        }, {
            module: AddSeverity
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        },
        'stdout'
        ]
    },
    ops: {
        interval: 5 * 60 * 1000
    }
};

export default {
    name: 'scarcity-logging',
    version: '1.0.0',
    register: async (server) => {
        await server.register({
            plugin: good,
            options
        });
        server.events.on('start', () => {
            const tags = ['info', 'startup'];
            const registrations = Object.keys(server.registrations);

            server.log(tags,
                [`${registrations.length} plugins registered`, registrations]
            );
            const table = server.table().map(({path, method}) => `${method}:${path}`);

            server.log(tags, table);
        });
    }
};
