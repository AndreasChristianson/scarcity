module.exports = {
    server: {
        auth: {
            cookiePassword: process.env['IRON_SECRET']
        },
        host: 'http://scarcity.pessimistic-it.com'
    }
};
