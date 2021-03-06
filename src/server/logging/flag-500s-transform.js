import {Transform} from 'stream';

export default class Flag500s extends Transform {
    constructor() {
        super({
            objectMode: true
        });
    }

    _transform(data, enc, next) {
        const {tags = [], statusCode = -1, event} = data;

        if (event === 'response' && statusCode >= 500) {
            return next(null, {
                ...data,
                tags: [
                    ...tags,
                    statusCode.toString(),
                    'error'
                ]
            });
        }

        return next(null, data);
    }
}
