import { BASE_URL } from "../../../config/api.config";
import { SportComplexResponse } from "../../models/sportComplex";
import axiosService from "../../services/axios.service";

export const getSportComplex = async (payload?: any): Promise<NonNullable<SportComplexResponse>> => {
    const { page, limit } = payload;
    const response = await axiosService.get(`${BASE_URL}/sport-complex?page=${page || 1}&limit=${limit || 5}`);
    return response?.data.data;
}

type payLoadGetComplexByProvince = {
    province?: number;
    district?: number;
}

export const getSportComplexByProvince = async (payload?: payLoadGetComplexByProvince): Promise<NonNullable<SportComplexResponse>> => {
    const response = await axiosService.get(`${BASE_URL}//sport-complex/search/?province=${payload?.province}&district=${payload?.district}&ward=`);
    return response?.data.data;
}