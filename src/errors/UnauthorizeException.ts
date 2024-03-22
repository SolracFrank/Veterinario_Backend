export class UnauthorizeException extends Error {
	status: number
	constructor(message: string) {
		super(message)
		this.status = 401
		this.name = 'UnauthorizeException'
		this.message = message
	}
}
