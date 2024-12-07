import { create } from "zustand";
import { UserLoginPayload } from "../../app/models/authModel/auth.model";
import { removeDataStorage, setDataStorage } from "../../app/untils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER } from "../../app/constans";
import { navigationRef } from "../../app/navigations/Navigation";
import { login, loginWithToken } from "../../app/apis/auth/auth.api";
import { getErrorResponse } from "../../app/untils/message";
import { ToastError, ToastSuccess } from "../../app/untils/ToastMessage/toast";

interface LoginType {
    remember: boolean;
    payload: UserLoginPayload;
}

interface authSoreState {
    isLoading: boolean;
    isToast: string | null;
    userDetail: any;
    login: ({ payload, remember }: LoginType) => void;
    loginWithToken: () => void;
};

export const authStore = create<authSoreState>()((set) => (
    {
        isLoading: false,
        isToast: null,
        userDetail: null,

        login: async ({ payload, remember }) => {
            try {
                set({ isLoading: true, isToast: null, userDetail: null });
                const response = await login(payload);
                const { accessToken, id, refreshToken, username, email, full_name, phone } = response;
                await setDataStorage(ACCESS_TOKEN, accessToken);
                await setDataStorage(REFRESH_TOKEN, refreshToken);
                const userDetail = { id, username, email, full_name, phone };
                await setDataStorage(REMEMBER, remember ? '1' : '');
                set({ isLoading: false, userDetail: userDetail, isToast: 'Đăng nhập thành công!' });
                ToastSuccess('Login success', 'Đăng nhập thành công!');
                navigationRef.navigate('navHome');
            } catch (error: any) {
                set({ isLoading: false, isToast: 'Tài khoản hoặc mật khẩu không chính xác!' });
                ToastError('Login error', 'Tài khoản hoặc mật khẩu không chính xác!');
            } finally {
                set({ isLoading: false });
            }
        },
        logout: async () => {
            navigationRef.navigate('login');
            set({ isToast: null, isLoading: false, userDetail: null });
            await removeDataStorage(REFRESH_TOKEN);
            await removeDataStorage(ACCESS_TOKEN);
            await removeDataStorage(REMEMBER);
        },
        loginWithToken: async () => {
            try {
                set({ isLoading: true, isToast: null, userDetail: null });
                const response = await loginWithToken();
                const { accessToken, id, refreshToken, username, email, full_name, phone } = response;
                await setDataStorage(ACCESS_TOKEN, accessToken);
                await setDataStorage(REFRESH_TOKEN, refreshToken);
                const userDetail = { id, username, email, full_name, phone };
                set({ isLoading: false, userDetail: userDetail, isToast: null });
                navigationRef.navigate('navHome');
            } catch (error: any) {
                set({ isLoading: false, isToast: 'Vui lòng đăng nhập lại!' });
                ToastError('Login error', 'Vui lòng đăng nhập lại!')
                navigationRef.navigate('login')
            } finally {
                set({ isLoading: false });
            }
        }
    }
))
