export interface registerRequest {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface loginRequest {
    email: string,
    password: string
}