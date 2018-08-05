import Stream from 'stream';

export default class GoodToWinston extends Stream.Writable {
    constructor(logger) {
        super({
            objectMode: true
        });
        this.logger = logger;
    }

    _write(data, encoding, callback) {
        this.handleEvent(data);
        setImmediate(callback);
    }

    handleEvent({event, ...data}) {
        const handlerMethod = this[`${event}ToLog`];

        if (handlerMethod) {
            handlerMethod.bind(this)(data);
        } else {
            this.manualPassthrough(event, data);
        }
    }

    logToLog(data) {
        this.manualPassthrough('Server log', data);
    }

    requestToLog(data) {
        this.manualPassthrough(`${data.method.toUpperCase()} ${data.path}`, data);
    }

    opsToLog({tags, load, os, proc}) {
        const details = {
            load,
            os,
            proc
        };

        this.log({tags}, `Uptime: ${proc.uptime}s`, details);
    }

    responseToLog({tags, source: {remoteAddress}, path, method, responseTime, statusCode}) {
        const message = `${remoteAddress} -> ${method.toUpperCase()} ${path} -> ${statusCode} (${responseTime}ms)`;

        this.log({tags}, message);
    }

    errorToLog({tags, error: {message, stack}}) {
        this.log(tags, message);
        process.stdout.write(`${stack}\n`);
    }

    manualPassthrough(prefix, data) {
        if (typeof data.data === 'string') {
            this.log(data, `${prefix}: ${data.data}`);
        } else {
            this.log(data, prefix, data.data);
        }
    }

    log({tags}, message, logData = false) {
        const method = this.getLogMethod(tags);

        if (logData) {
            method(message, logData);
        } else {
            method(message);
        }
    }

    getLogMethod(tags) {
        const logger = this.logger;
        const tagToLogmethod = {
            emergency: logger.emergency,
            emerg: logger.emergency,
            alert: logger.alert,
            crash: logger.alert,
            help: logger.alert,
            critical: logger.critical,
            crit: logger.critical,
            fatal: logger.critical,
            error: logger.error,
            warn: logger.warning,
            warning: logger.warning,
            notice: logger.notice,
            data: logger.notice,
            info: logger.info,
            http: logger.info,
            verbose: logger.info,
            debug: logger.debug,
            trace: logger.debug,
            silly: logger.debug
        };

        for (const tag in tagToLogmethod) {
            if (tags.map((t) => t.toString().toLowerCase()).includes(tag)) {
                return tagToLogmethod[tag];
            }
        }

        return logger.notice;
    }
}
