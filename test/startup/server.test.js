import serverGenerator from '../../src/server/server-generator';

describe('server generator', () => {
    let server;

    beforeEach(async () => {
        server = await serverGenerator();
    });

    afterEach(() => server.stop());

    test('should load the logging plugin', () => {
        expect(server.registrations['scarcity-logging'].version).toBe('1.0.0');
    });
});
