import { BASE_URL } from "../../../config/api.config";
import { FieldResponse } from "../../models/booking";
import axiosService from "../../services/axios.service";

export const getSlot = async (): Promise<NonNullable<FieldResponse>> => {
    const response = await axiosService.get(`${BASE_URL}/appointment/yard/33?day=2024-12-09`);
    return response?.data;
}