import {
    Transform
} from 'stream';

export default class Flag500s extends Transform {
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
