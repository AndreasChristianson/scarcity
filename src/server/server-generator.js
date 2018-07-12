import Hapi from 'hapi';
import config from 'config';
import plugins from './plugins';
import routes from './routes';

export default async () => {
  const server = Hapi.server({
      port: config.get('server.port')
  });

    await Promise.all(
      plugins.map((plugin) => server.register(plugin))
    );

    routes.forEach((route)=>server.route(route));

    return server;
};
