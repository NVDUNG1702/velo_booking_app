export interface UserLoginData {
    username: string,
    password: string
}

export interface UserLoginPayload extends UserLoginData { }

export interface UserLoginForm extends UserLoginData { };

export interface UserDetailModel {
    id: number | string,
    username: string,
    full_name?: string,
    email?: string,
    phone?: string,
}

export interface UserResponse extends UserDetailModel {
    accessToken: string,
    refreshToken: string
}