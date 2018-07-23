import {
    Transform
} from 'stream';

export default class AddEventTags extends Transform {
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
