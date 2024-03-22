export class UnauthorizeException extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.name = 'UnauthorizeException';
        this.message = message;
    }
}
