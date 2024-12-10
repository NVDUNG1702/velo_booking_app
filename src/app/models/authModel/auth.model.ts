export interface UserLoginData {
    username: string,
    password: string
}

export interface UserSignupData extends UserLoginData {
    email: string,
    phone: string,
    full_name: string,
}

export interface UserSignupResponse {
    username: string;
    password: string;
    full_name: string;
    phone: string;
    email: string;
    status_account: string;
}

export interface UserSignupPayload extends UserSignupData { };

export interface UserLoginPayload extends UserLoginData { };

export interface UserLoginForm extends UserLoginData { };

export interface UserDetailModel {
    id: number | string,
    username: string,
    full_name?: string,
    email?: string,
    phone?: string,
    avatar?: string
}

export interface UserResponse extends UserDetailModel {
    accessToken: string,
    refreshToken: string
}