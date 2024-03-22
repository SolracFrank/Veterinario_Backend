export class BadRequestException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'BadRequestException';
        this.message = message;
    }
}
