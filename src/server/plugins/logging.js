import good from 'good';

export default   {
      name: 'scarcity-logging',
      version: '1.0.0',
      register: async  (server, options) =>
        server.register({
              plugin: good,
              options:{
                  ops: {
                      interval: 30000
                  },
                  reporters: {
                      myConsoleReporter: [{
                          module: 'good-squeeze',
                          name: 'Squeeze',
                          args: [{ log: '*', response: '*' ,request: '*' }]
                      }, {
                          module: 'good-console'
                      }, 'stdout']
                  }
              },
          })

  };
