export class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.name = 'NotFoundException';
        this.message = message;
    }
}
