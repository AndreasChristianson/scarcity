import generator from '../server/server-generator';

const init = async () => {
  const server = await generator();
  await server.start();
  server.log('notice',['Server running!', server.info]);
};

init();
