import config from 'config';

import winston from 'winston';

const levels = {
    emergency: 0,
    alert: 1,
    critical: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
};
const colors = {
    emergency: 'bold red',
    alert: 'red',
    critical: 'red',
    error: 'bold yellow',
    warning: 'yellow',
    notice: 'green',
    info: 'blue',
    debug: 'grey'
};

const gkeFormat = winston.format((info) => {
    // eslint-disable-next-line no-param-reassign
    info.severity = info.level.toUpperCase();

    return info;
});

winston.addColors(colors);

export default winston.createLogger({
    format: winston.format.combine(
        gkeFormat(),
        winston.format.json(),
    ),
    levels,
    level: config.get('server.logging.level'),
    transports: [
        new winston.transports.Console()
    ]
});
