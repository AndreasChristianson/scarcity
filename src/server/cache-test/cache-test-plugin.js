import crypto from 'crypto';
import config from 'config';

import route from './cache-test-route';

const seconds = 1000;
const cacheDuration = 30 * seconds;

export default {
  name: 'scarcity-cache-test',
  version: '1.0.0',
  register: async (server, options) => {
    server.method({
      name: 'createId',
      method: () => {
        const id = crypto.randomBytes(8).toString("hex");
        server.log('trace',`Created new ID ${id}.`)
        return id;
      },
      options: {
        cache: {
          expiresIn: cacheDuration,
          generateTimeout: config.get('server.options.generateTimeout')
        }
      }
    });
    server.log(['notice'],`Created server method with caching set to ${cacheDuration}ms.`)
    server.route(route);
  }
};
