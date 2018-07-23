import {
    Transform
} from 'stream';

export default class AddSeverity extends Transform {
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
