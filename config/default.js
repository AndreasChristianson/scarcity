module.exports = {
    server: {
        options: {
            port: process.env['SCARCITY_PORT'] || 8080,
            logging: {
                prettyPrint: true,
                level: 'trace'
            },
            generateTimeout: 500
        },
        auth: {
            sessionTimeout: 24 * 60 * 60 * 1000,
            cookiePassword: 'this-password-is-*NOT*-random!!!',
            useSecureCookies: false,
            cookieName: 'sid'
        }
    }
};
