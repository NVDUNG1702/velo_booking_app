import { BASE_URL } from "../../../config/api.config";
import { FieldResponse } from "../../models/booking";
import axiosService from "../../services/axios.service";

export type payloadGetSlot = {
    id: number;
    time: string;
}

export const getSlot = async (payload: payloadGetSlot): Promise<NonNullable<FieldResponse>> => {
    const { id, time } = payload;
    const response = await axiosService.get(`${BASE_URL}/appointment/yard/${id}?day=${time}`);
    return response?.data;
}