import {
  Transform,
  PassThrough
} from 'stream';
import config from 'config';
import good from 'good';

class AddSeverity extends Transform {
  constructor(options) {
    super({
      objectMode: true
    });
  }

  npmLevelToSeverity(tags) {
    const npmLevelToSeverityMap = {
      emergency: 'EMERGENCY',
      alert: 'ALERT',
      critical: 'CRITICAL',
      error: 'ERROR',
      warn: 'WARNING',
      info: 'INFO',
      notice: 'NOTICE',
      verbose: 'DEBUG',
      debug: 'DEBUG',
      trace: 'DEBUG',
      silly: 'DEBUG'
    };

    for (var level in npmLevelToSeverityMap) {
      if (tags.includes(level)) {
        return npmLevelToSeverityMap[level];
      }
    }
    return 'NOTICE';
  };

  _transform(data, enc, next) {
    data.severity = this.npmLevelToSeverity(data.tags || []);
    next(null, data);
  }
}

class AddEventTags extends Transform {
  constructor(options) {
    super({
      objectMode: true
    });
  }
  eventToTag(event) {
    const eventToTagMap = {
      response: ['silly'],
      ops: ['silly']
    };
    return eventToTagMap[event] || [];
  }
  _transform(data, enc, next) {
    data.tags = (data.tags || []).concat(this.eventToTag(data.event));
    next(null, data);
  }
}

class Flag500s extends Transform {
  constructor(options) {
    super({
      objectMode: true
    });
  }
  _transform(data, enc, next) {
    if (data.event === 'response' && data.statusCode>=500)
      data.tags = (data.tags || []).concat([data.statusCode, 'error']);
    next(null, data);
  }
}

const options = {
  reporters: {
    stdout: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          request: '*',
          error: '*',
          ops: '*',
          response: '*'
        }]
      }, {
        module: AddEventTags
      }, {
        module: Flag500s
      }, {
        module: AddSeverity
      }, {
        module: 'good-squeeze',
        name: 'SafeJson'
      },
      'stdout'
    ]
  },
  ops: {
    interval: 5 * 60 * 1000
  }
};

export default {
  name: 'scarcity-logging',
  version: '1.0.0',
  register: (server) => {
    return server.register({
      plugin: good,
      options
    });

  }
};
