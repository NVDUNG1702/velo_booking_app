import { UserLoginPayload, UserResponse } from "../../models/authModel/auth.model";
import axiosService from "../../services/axios.service";

const BASE_URL = '/user';

export const login = async (payload: UserLoginPayload): Promise<NonNullable<UserResponse>> => {
    const response = await axiosService.get(`${BASE_URL}/1`);
    return response?.data;
}