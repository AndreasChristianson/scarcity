module.exports = {
  server: {
    options: {
      cache: [{
        engine: require('catbox-redis'),
        host: 'redis'
      }],
      logging: {
        prettyPrint: false,
        level:'trace'
      }
    }
  }
};
