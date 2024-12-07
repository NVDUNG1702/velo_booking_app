export interface SignUpCheckAccountPayLoad {
    username: string,
    password: string,
    full_name: string,
    phone: string,
    email: string
}

export interface SignUpPayLoad extends SignUpCheckAccountPayLoad {
    otp: string,
}

export interface SignUpResponse {
    status: number;
    message: string;
    data: string;
}