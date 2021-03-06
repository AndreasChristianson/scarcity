import crypto from 'crypto';
import config from 'config';

import logger from '../../logger';

import route from './cache-test-route';

const seconds = 1000;
const cacheDuration = 30 * seconds;

export default {
    name: 'scarcity-cache-test',
    version: '1.0.0',
    register: (server) => {
        server.method({
            name: 'createId',
            method: () => {
                const id = crypto.randomBytes(8).toString('hex');

                logger.debug(`Created new ID ${id}.`);

                return id;
            },
            options: {
                cache: {
                    expiresIn: cacheDuration,
                    generateTimeout: config.get('server.options.generateTimeout')
                }
            }
        });
        server.route(route);
    }
};
