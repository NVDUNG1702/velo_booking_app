
import axios from 'axios';

export const getTokenFromRefreshToken = async (refreshToken: string) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL_API || ''}/v1/refresh-token`, null, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        return response.data;
    } catch (error) {
        // log check
        console.log("Refresh token error: ", error);
    }
}