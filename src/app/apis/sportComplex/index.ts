import { BASE_URL } from "../../../config/api.config";
import { SportComplexResponse } from "../../models/sportComplex";
import axiosService from "../../services/axios.service";

export const getSportComplex = async (payload?: any): Promise<NonNullable<SportComplexResponse>> => {
    const response = await axiosService.get(`${BASE_URL}/sport-complex?page=${payload.page || 1}&limit=5`);
    return response?.data.data;
}