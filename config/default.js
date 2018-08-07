module.exports = {
    server: {
        options: {
            port: process.env['SCARCITY_PORT'] || 8080,
            generateTimeout: 500
        },
        logging: {
            level: 'debug',
            opsInterval: 60 * 1000
        },
        auth: {
            sessionTimeout: 24 * 60 * 60 * 1000,
            cookiePassword: 'this-password-is-*NOT*-random!!!',
            useSecureCookies: false,
            cookieName: 'sid'
        }
    },
    redis: {
        host: process.env['REDIS_HOST'] || 'localhost'
    }
};
