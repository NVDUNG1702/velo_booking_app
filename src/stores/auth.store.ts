import { create } from "zustand";
import { UserLoginPayload } from "../app/models/authModel/auth.model";
import { removeDataStorage, setDataStorage } from "../app/untils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../app/constans";
import { navigationRef } from "../app/navigations/Navigation";
import { login } from "../app/apis/auth/auth.api";
import { getErrorResponse } from "../app/untils/message";

interface authSoreState {
    isLoading: boolean;
    isError: string | null;
    userDetail: any;
    login: (payload: UserLoginPayload) => void

};

export const authStore = create<authSoreState>()((set) => (
    {
        isLoading: false,
        isError: null,
        userDetail: null,

        login: async (payload) => {
            try {
                set({ isLoading: true, isError: null, userDetail: null });
                const response = await login(payload);

                const { accessToken, id, refreshToken, username, email, full_name, phone } = response;

                await setDataStorage(ACCESS_TOKEN, accessToken);
                await setDataStorage(REFRESH_TOKEN, refreshToken);

                const userDetail = { id, username, email, full_name, phone };
                set({ isLoading: false, userDetail: userDetail, isError: null });
            } catch (error) {
                set({ isLoading: false, isError: getErrorResponse(error) });
            } finally {
                set({ isLoading: false });
            }
        },
        logout: async () => {
            navigationRef.navigate('login');
            set({ isError: null, isLoading: false, userDetail: null });
            await removeDataStorage(REFRESH_TOKEN);
            await removeDataStorage(ACCESS_TOKEN);
        }
    }
))
