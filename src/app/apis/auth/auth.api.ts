import axios from "axios";
import { UserLoginPayload, UserResponse, UserSignupPayload, UserSignupResponse } from "../../models/authModel/auth.model";
import { OTPEmailPayload, OTPEmailResponse } from "../../models/authModel/otp.model";
import axiosService from "../../services/axios.service";

const BASE_URL = '/auth';

export const login = async (payload: UserLoginPayload): Promise<NonNullable<UserResponse>> => {
    const response = await axios.post(`${BASE_URL}/login`, payload);
    return response?.data;
}

export const signup = async (payload: UserSignupPayload): Promise<NonNullable<UserSignupResponse>> => {
    const response = await axiosService.post(`${BASE_URL}/signup`, payload);
    return response.data;
}

export const senOTPByMail = async (payload: OTPEmailPayload): Promise<NonNullable<OTPEmailResponse>> => {
    const response = await axios.post(`${BASE_URL}/send-otp-mail`, payload);
    return response.data;
}