import good from 'good';

import AddSeverity from './append-severity-transform';
import AddEventTags from './append-event-tags-transform';
import Flag500s from './flag-500s-transform';

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
        }, {
            module: AddEventTags
        }, {
            module: Flag500s
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
    register: (server) => server.register({
        plugin: good,
        options
    })
};
