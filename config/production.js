module.exports = {
  server: {
    options: {
      cache: [{
        name: 'redisCache',
        engine: require('catbox-redis'),
        host: 'redis-container'
      }],
      logging: {
        prettyPrint: false
      }
    }
  }
};
