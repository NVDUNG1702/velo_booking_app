
import axios from 'axios';
import { BASE_URL } from '../../../config/api.config';

interface Payload {
    id: number;
    username: string;
    full_name: string;
    email: string;
    phone: string;
}

interface Data {
    accessToken: string;
    refreshToken: string;
    payload: Payload;
}

interface RefreshResponse {
    status: number;
    message: string;
    data: Data;
}
export const getTokenFromRefreshToken = async (refreshToken: string, clientID: number): Promise<RefreshResponse> => {
    try {
        const response = await axios.post<RefreshResponse>(`${BASE_URL}/refresh-token`, null, {
            headers: {
                'x-client-id': clientID,
                'rf-token': `${refreshToken}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Refresh token error:", error.message || error);

        throw new Error(
            `Failed to refresh token: ${error.response?.data?.message || "Unknown error"}`
        );
    }
};