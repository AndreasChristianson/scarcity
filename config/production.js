module.exports = {
    server: {
        options: {
            cache: [{
                engine: require('catbox-redis'),
                host: process.env[REDIS_HOST]
            }],
            logging: {
                prettyPrint: false,
                level: 'trace'
            }
        }
    }
};
