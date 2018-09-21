const ignore = () => false;

export default class Cancelable {
    constructor(promise, resolveAction, cancelAction = ignore) {
        this.promise = promise;
        this.resolveAction = resolveAction;
        this.cancelAction = cancelAction;
        this.wait();
    }

    cancel = () => {
        this.cancelled = true;

        if (this.fired) {
            this.cancelAction(this.awaited);
        }
    }

    wait = async () => {
        this.awaited = await this.promise;

        this.fire();
    }

    fire = () => {
        if (!this.cancelled) {
            this.resolveAction(this.awaited);
            this.fired = true;
        }
    }
}
