import {
    Transform
} from 'stream';

import good from 'good';

class AddSeverity extends Transform {
    constructor() {
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

        for (const level in npmLevelToSeverityMap) {
            if (tags.includes(level)) {
                return npmLevelToSeverityMap[level];
            }
        }

        return 'NOTICE';
    }

    _transform(data, enc, next) {
        next(null, {
            ...data,
            severity: this.npmLevelToSeverity(data.tags || [])
        });
    }
}

class AddEventTags extends Transform {
    constructor() {
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
        next(null, {
            ...data,
            tags: (data.tags || []).concat(this.eventToTag(data.event))
        });
    }
}

class Flag500s extends Transform {
    constructor() {
        super({
            objectMode: true
        });
    }

    _transform(data, enc, next) {
        const transformedData = data;

        if (data.event === 'response' && data.statusCode >= 500) {
            transformedData.tags = (data.tags || []).concat([data.statusCode, 'error']);
        }

        next(null, transformedData);
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
                response: {
                    exclude: ['do not log']
                }
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
    register: (server) => server.register({
        plugin: good,
        options
    })
};
