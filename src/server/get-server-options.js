import config from 'config';

import engine from 'catbox-redis';

export default () => {
    const port = config.get('server.options.port');
    const cache = [{
        host: config.get('redis.host'),

        engine
    }];

    return {
        port,
        cache
    };
};
