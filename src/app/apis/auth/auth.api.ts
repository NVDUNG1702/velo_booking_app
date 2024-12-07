import { BASE_URL } from './../../../config/api.config';
import axios from "axios";
import { UserLoginPayload, UserResponse, UserSignupPayload, UserSignupResponse } from "../../models/authModel/auth.model";
import { OTPEmailPayload, OTPEmailResponse } from "../../models/authModel/otp.model";
import axiosService from '../../services/axios.service';
import { SignUpCheckAccountPayLoad, SignUpPayLoad, SignUpResponse } from '../../models/authModel/signup.model';

export const login = async (payload: UserLoginPayload): Promise<NonNullable<UserResponse>> => {
    const response = await axios.post(`${BASE_URL}/login`, payload);
    return response?.data;
}

export const signup = async (payload: SignUpPayLoad): Promise<NonNullable<UserSignupResponse>> => {
    const response = await axios.post(`${BASE_URL}/signup`, payload);
    return response.data;
}

export const senOTPByMail = async (payload: OTPEmailPayload): Promise<NonNullable<OTPEmailResponse>> => {
    const response = await axios.post(`${BASE_URL}/send-otp-mail`, payload);
    return response.data;
}

export const loginWithToken = async (): Promise<NonNullable<UserResponse>> => {
    const response = await axiosService.post('');
    return response.data;
}

export const checkDataSignUp = async (payload: SignUpCheckAccountPayLoad): Promise<NonNullable<SignUpResponse>> => {
    const response = await axios.post(`${BASE_URL}/check-account`, payload);
    return response.data;
}