import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constans";
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getDataStorage, removeDataStorage, setDataStorage } from "../untils/localStorage";
import { jwtDecode } from 'jwt-decode';
import dayjs from "dayjs";
import { getTokenFromRefreshToken } from "../apis/auth/refreshToken";
import { createNavigationContainerRef } from "@react-navigation/native";

class AxiosService {
    // private service: AxiosInstance;
    private JWT: string | null = null;
    private refreshToken: string | null = null;

    constructor() {
        this.init();

        const service = axios.create({
            baseURL: process.env.REACT_APP_URL_API,
            headers: {}
        })

        service.interceptors.request.use(
            async (config) => {

                if (!this.JWT) await this.initToken();

                if (!!this.JWT) config.headers.Authorization = `Bearer ${this.JWT}`;

                if (!this.JWT) return config;

                const user: any = jwtDecode(this.JWT);
                const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;

                if (!isExpired) return config;

                if (!this.refreshToken) return config;

                let newToken = await getTokenFromRefreshToken(this.refreshToken);
                if (!newToken) {
                    await removeDataStorage(ACCESS_TOKEN);
                    await removeDataStorage(REFRESH_TOKEN);
                    return config;
                }

                const { refreshToken, accessToken } = newToken.accessToken;
                config.headers.Authorization = `Bearer ${accessToken}`;
                await setDataStorage(ACCESS_TOKEN, accessToken);
                await setDataStorage(REFRESH_TOKEN, refreshToken);

                newToken = null;

                return config;
            },
            async function (error) {
                return Promise.reject(error);
            }
        );

        service.interceptors.response.use()
    }

    private async init() {
        await this.initToken();
    }

    private async initToken() {
        const JWT = await getDataStorage(ACCESS_TOKEN);
        const refreshToken = await getDataStorage(REFRESH_TOKEN);
        this.JWT = JWT ?? null;
        this.refreshToken = refreshToken ?? null;
    }

    private handleResponSuccess(response: any) {
        return response;
    }

    private handleResponseError(error: any) {
        const caseToRedirectLogin = ['Invalid token.', 'User Not Found'];
        if (caseToRedirectLogin.includes(error.response?.data?.message) && navigationRef.isReady()) {
            navigationRef;
        }
    }

    redirectToLogin() {
        if (navigationRef.isReady()) {
            // navigationRef.navigate("login")
        }
    }

}