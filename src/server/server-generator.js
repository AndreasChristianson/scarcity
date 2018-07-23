import Hapi from 'hapi';

import plugins from './plugins';
import routes from './routes';
import getServerOptions from './get-server-options';

export default async () => {
    const server = Hapi.server(getServerOptions());

    await Promise.all(
        plugins.map((plugin) => server.register(plugin))
    );

    const registrations = Object.keys(server.registrations);

    server.log(
        ['info', 'startup'],
        [`${registrations.length} plugins registered`, registrations]
    );

    routes.forEach((route) => server.route(route));

    return server;
};
