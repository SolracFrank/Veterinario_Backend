export class NullUriException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "NullUriException";
    }
}
