import {Transform} from 'stream';

const npmLevelToSeverityMap = {
    emergency: 'EMERGENCY',
    alert: 'ALERT',
    critical: 'CRITICAL',
    fatal: 'CRITICAL',
    error: 'ERROR',
    warn: 'WARNING',
    info: 'INFO',
    notice: 'NOTICE',
    verbose: 'DEBUG',
    debug: 'DEBUG',
    trace: 'DEBUG',
    silly: 'DEBUG'
};

export default class AddSeverity extends Transform {
    constructor() {
        super({
            objectMode: true
        });
    }

    npmLevelToSeverity(tags) {
        for (const level in npmLevelToSeverityMap) {
            if (tags.map((t) => t.toString().toLowerCase()).includes(level)) {
                return npmLevelToSeverityMap[level];
            }
        }

        return 'NOTICE';
    }

    _transform(data, enc, next) {
        const {tags = []} = data;

        next(null, {
            ...data,
            severity: this.npmLevelToSeverity(tags)
        });
    }
}
