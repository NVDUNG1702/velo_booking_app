export interface UserLoginData {
    username: string,
    password: string
}

export interface UserLoginPayload extends UserLoginData { }

export interface UserLoginForm extends UserLoginData { };