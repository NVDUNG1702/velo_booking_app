import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constans";
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getDataStorage, removeDataStorage, setDataStorage } from "../untils/localStorage";
import { jwtDecode } from 'jwt-decode';
import dayjs from "dayjs";
import { getTokenFromRefreshToken } from "../apis/auth/refreshToken";
import { navigationRef } from "../navigations/Navigation";
import { BASE_URL } from "../../config/api.config";
import { ToastError } from "../untils/ToastMessage/toast";

class AxiosService {
    private service: AxiosInstance;
    private JWT: string | null = null;
    private refreshToken: string | null = null;

    constructor() {
        this.init();

        const service = axios.create({
            baseURL: BASE_URL,
            headers: {}
        })

        service.interceptors.request.use(
            async (config) => {

                if (!this.JWT || !this.refreshToken) await this.initToken();

                if (!this.JWT || !this.refreshToken) {
                    this.clearData();
                    navigationRef.navigate("login");
                    return config;
                };

                let decodeRefreshToken: any = jwtDecode(this.refreshToken);
                const isExpiredRefreshToken = dayjs.unix(decodeRefreshToken?.exp).diff(dayjs()) > 1;

                if (!isExpiredRefreshToken){ 
                    this.clearData();
                    navigationRef.navigate("login");
                    return config;
                };

                let user: any = jwtDecode(this.JWT);
                const isExpired = dayjs.unix(user?.exp).diff(dayjs()) > 1;

                if (!isExpired) {
                    let newToken = await getTokenFromRefreshToken(this.refreshToken, user.id);
                    if (!newToken) {
                        navigationRef.navigate("login");
                        await removeDataStorage(ACCESS_TOKEN);
                        await removeDataStorage(REFRESH_TOKEN);
                        return config;
                    }

                    const { refreshToken, accessToken } = newToken.data;
                    config.headers.set('Authorization', `Bearer ${accessToken}`);
                    config.headers.set('rf-token', refreshToken);
                    config.headers.set('x-client-id', user.id);
                    await setDataStorage(ACCESS_TOKEN, accessToken);
                    await setDataStorage(REFRESH_TOKEN, refreshToken);
                    newToken = null;
                    return config;
                };

                config.headers.set('Authorization', `Bearer ${this.JWT}`);
                config.headers.set('rf-token', this.refreshToken);
                config.headers.set('x-client-id', user.id);
                return config;
            },
            async function (error) {
                return Promise.reject(error);
            }
        );

        service.interceptors.response.use(this.handleResponSuccess, this.handleResponseError);

        this.service = service;
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

    private async handleResponseError(error: any) {
        // const caseToRedirectLogin = ['Invalid token.', 'User Not Found'];
        // if (caseToRedirectLogin.includes(error.response?.data?.message)) {
        //     this.clearData();
        //     navigationRef.navigate("login");
        //     return;
        // }
        if (error?.response?.tatus === 401) {
            this.clearData();
            navigationRef.navigate("login");
            return;
        }
        if (error?.response?.tatus === 403) {
            await this.initToken();
            if (!this.JWT || !this.refreshToken) {
                this.clearData();
                navigationRef.navigate("login");
                return;
            }
            let decodeRefreshToken: any = jwtDecode(this.refreshToken);
            const isExpiredRefreshToken = dayjs.unix(decodeRefreshToken?.exp).diff(dayjs()) > 1;

            if (!isExpiredRefreshToken) {
                this.clearData();
                navigationRef.navigate("login");
                return Promise.reject(error)
            };
            let newToken = await getTokenFromRefreshToken(this.refreshToken, decodeRefreshToken.id);
            if (!newToken) {
                await removeDataStorage(ACCESS_TOKEN);
                await removeDataStorage(REFRESH_TOKEN);
                navigationRef.navigate("login");
                return error;
            }

            const { refreshToken, accessToken } = newToken.data;
            error.config.headers.set('Authorization', `Bearer ${accessToken}`);
            error.config.headers.set('rf-token', refreshToken);
            error.config.headers.set('x-client-id', decodeRefreshToken.id);
            await setDataStorage(ACCESS_TOKEN, accessToken);
            await setDataStorage(REFRESH_TOKEN, refreshToken);
            return this.service.request(error.config)
        }
        return Promise.reject(error);
    }

    clearData() {
        removeDataStorage(ACCESS_TOKEN);
        removeDataStorage(REFRESH_TOKEN);
    }

    get(endpoint: string, config?: AxiosRequestConfig<any>) {
        return this.service.get(endpoint, config);
    }

    post(endpoint: string, payload?: any, config?: AxiosRequestConfig<any>) {
        return this.service.post(endpoint, payload, config);
    }

    put(endpoint: string, payload?: any, config?: AxiosRequestConfig<any>) {
        return this.service.put(endpoint, payload, config);
    }

    patch(endpoint: string, payload?: any, config?: AxiosRequestConfig<any>) {
        return this.service.patch(endpoint, payload, config);
    }

    delete(endpoint: string) {
        return this.service.delete(endpoint);
    }
}

export default new AxiosService();