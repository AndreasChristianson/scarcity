import pino from 'hapi-pino';
import config from 'config';

export default {
  name: 'scarcity-logging',
  version: '1.0.0',
  register: (server, options) => server.register({
    plugin: pino,
    options: {
      prettyPrint: config.get('server.options.logging.prettyPrint')
    }
  })

};
