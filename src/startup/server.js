import generator from '../server/server-generator';
import logger from '../logger';

const init = async () => {
    const server = await generator();

    await server.start();
    const {info} = server;

    logger.info('Server running!', {info});
};

init();
