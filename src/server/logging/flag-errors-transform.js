import {Transform} from 'stream';

export default class FlagErrors extends Transform {
    constructor() {
        super({
            objectMode: true
        });
    }

    _transform(data, enc, next) {
        const {error, tags = []} = data;

        if (error && error.severity) {
            return next(null, {
                ...data,
                tags: [
                    ...tags,
                    error.severity.toLowerCase()
                ]
            });
        }

        return next(null, data);
    }
}
