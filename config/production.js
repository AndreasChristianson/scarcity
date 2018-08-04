
module.exports = {
    server: {
        auth: {
            cookiePassword: require('crypto').randomBytes(32).toString('hex')
        }
    }
};
