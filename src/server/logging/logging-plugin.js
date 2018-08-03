import config from 'config';

import good from 'good';

import logger from '../../logger';

import AddEventTags from './append-event-tags-transform';
import Flag500s from './flag-500s-transform';
import FlagErrors from './flag-errors-transform';
import goodToWinston from './good-to-winston';

const options = {
    reporters: {
        winston: [{
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
            module: FlagErrors
        }, {
            module: goodToWinston,
            args: [
                logger
            ]
        }]
    },
    ops: {
        interval: config.get('server.logging.opsInterval')
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
            const registrations = Object.keys(server.registrations);

            logger.debug(`Plugins registered: ${registrations.length}`, {registrations});
            const routes = server.table().map(({path, method}) => `${method}:${path}`);

            logger.debug(`Routes registered: ${routes.length}`, {routes});
            const methods = Object.keys(server.methods);

            logger.debug(`Methods registered: ${methods.length}`, {methods});
        });
    }
};
