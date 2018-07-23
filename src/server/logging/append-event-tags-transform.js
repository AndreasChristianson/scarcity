import {Transform} from 'stream';

const eventToTagMap = {
    response: ['silly'],
    ops: ['silly'],
    error: ['error']
};

export default class AddEventTags extends Transform {
    constructor() {
        super({
            objectMode: true
        });
    }

    transformTags(data) {
        const {tags = [], event} = data;
        const eventTags = eventToTagMap[event] || [];

        return [
            ...tags,
            ...eventTags,
            event
        ];
    }

    _transform(data, enc, next) {
        const tags = this.transformTags(data);

        next(null, {
            ...data,
            tags
        });
    }
}
