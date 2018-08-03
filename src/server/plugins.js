import inert from 'inert';

import logging from './logging/logging-plugin';
import cacheTest from './cache-test/cache-test-plugin';
import pg from './pg/pg-plugin';
import ws from './websockets/websocket-plugin';
import auth from './auth/auth-plugin';

export default [
    logging,
    cacheTest,
    inert,
    pg,
    ws,
    auth
];
