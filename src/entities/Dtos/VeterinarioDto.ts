export interface VeterinarioLoginResponse {
	nombre: string
	email: string
	JwtToken: {
		token: string
	}
}
