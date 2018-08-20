import Hapi from 'hapi';
import catboxRedis from 'catbox-redis';

describe('catbox', () => {
    test('should cache bool results', async () => {
        const server = Hapi.server({
            cache: [{
                host: '127.0.0.1',
                engine: catboxRedis
            }]
        });

        server.method({
            name: 'returnsBool',
            method: () => false,
            options: {
                cache: {
                    expiresIn: 60000,
                    generateTimeout: 1000,
                    getDecoratedValue: true
                }
            }
        });

        await server.initialize();

        await server.methods.returnsBool();
        await server.methods.returnsBool();

        expect(server.methods.returnsBool.cache.stats).toEqual({
            sets: 1,
            gets: 2,
            hits: 1,
            stales: 0,
            generates: 1,
            errors: 0
        });
    });
});
