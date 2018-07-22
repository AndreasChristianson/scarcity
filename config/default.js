module.exports = {
    server: {
        options: {
            port: process.env['SCARCITY_PORT'] || 8080,
            logging: {
                prettyPrint: true,
                level: 'trace'
            },
            generateTimeout: 500
        }
    }
};
