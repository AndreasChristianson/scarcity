module.exports = {
  server: {
    options: {
      port: process.env['SCARCITY_PORT'] || 8080,
      logging: {
        prettyPrint: process.env.NODE_ENV !== 'production'
      }
    }
  }
};
