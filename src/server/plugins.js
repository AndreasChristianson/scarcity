import blipp from 'blipp';
import inert from 'inert';

import logging from './logging/logging-plugin';
import cacheTest from './cache-test/cache-test-plugin';

export default [
    logging,
    cacheTest,
    blipp,
    inert
];
