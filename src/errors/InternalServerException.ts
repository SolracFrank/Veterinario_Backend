export class InternalServerException extends Error {
	status: number
	constructor(message: string) {
		super(message)
		this.status = 500
		this.name = 'InternalServerException'
	}
}
