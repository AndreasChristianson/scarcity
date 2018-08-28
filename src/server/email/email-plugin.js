import emailTransport from './email-transport';

export default {
    name: 'scarcity-email',
    version: '1.0.0',
    register: (server) => {
        server.decorate('toolkit', 'email', emailTransport);
        server.decorate('server', 'email', emailTransport);
    }
};

