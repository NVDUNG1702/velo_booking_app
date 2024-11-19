import { UserLoginPayload, UserResponse, UserSignupPayload, UserSignupResponse } from "../../models/authModel/auth.model";
import axiosService from "../../services/axios.service";

const BASE_URL = '/auth';

export const login = async (payload: UserLoginPayload): Promise<NonNullable<UserResponse>> => {
    const response = await axiosService.post(`${BASE_URL}/login`, payload);
    return response?.data;
}

export const signup = async (payload: UserSignupPayload): Promise<NonNullable<UserSignupResponse>> => {
    const response = await axiosService.post(`${BASE_URL}/signup`, payload);
    return response.data;
}

// export const senOTP = async (payload: )