/**
 * MODEL OTP
 */

export interface OTPEmailPayload {
    email: string;
}

export interface OTPPhonePayload {
    phone: string;
}

export interface OTPEmailResponse {
    message: string,
    data: string,
}