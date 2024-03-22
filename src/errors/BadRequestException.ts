export class BadRequestException extends Error {
	status: number
	constructor(message: string, status: number) {
		super(message)
		this.status = status
		this.name = 'BadRequestException'
		this.message = message
	}
}
