import { create } from "zustand";
import { UserDetailModel, UserLoginPayload } from "../../app/models/authModel/auth.model";
import { getDataStorage, removeDataStorage, setDataStorage } from "../../app/untils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER } from "../../app/constans";
import { navigationRef } from "../../app/navigations/Navigation";
import { login } from "../../app/apis/auth/auth.api";
import { ToastError, ToastSuccess } from "../../app/untils/ToastMessage/toast";
import { getTokenFromRefreshToken } from "../../app/apis/auth/refreshToken";
import { JwtPayload, jwtDecode } from "jwt-decode";

// Định nghĩa kiểu cho payload
interface CustomJwtPayload extends JwtPayload {
    id: number;
    username: string;
    email: string;
    full_name?: string;
}

interface LoginType {
    remember: boolean;
    payload: UserLoginPayload;
}

interface authSoreState {
    isLoading: boolean;
    isToast: string | null;
    userDetail: UserDetailModel | null;
    login: ({ payload, remember }: LoginType) => void;
    loginWithToken: () => void;
    logout: () => void;
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
                const handleSuccess = () => {
                    set({ isLoading: false, userDetail: userDetail, isToast: 'Đăng nhập thành công!' });
                    navigationRef.navigate('navHome');
                }
                ToastSuccess('Login success', 'Đăng nhập thành công!', 2000, handleSuccess);
            } catch (error: any) {
                set({ isLoading: false, isToast: 'Tài khoản hoặc mật khẩu không chính xác!' });
                ToastError('Login error', 'Tài khoản hoặc mật khẩu không chính xác!');
            } finally {
                set({ isLoading: false });
            }
        },
        logout: async () => {
            navigationRef.reset({
                index: 0,
                routes: [{ name: 'login' }],
            })
            set({ isToast: null, isLoading: false, userDetail: null });
            await removeDataStorage(REFRESH_TOKEN);
            await removeDataStorage(ACCESS_TOKEN);
            await removeDataStorage(REMEMBER);
        },
        loginWithToken: async () => {
            try {
                set({ isLoading: true, isToast: null, userDetail: null });
                const refreshToken = await getDataStorage(REFRESH_TOKEN);
                if (!refreshToken) {
                    navigationRef.reset({
                        index: 0,
                        routes: [{ name: 'login' }],
                    })
                    return;
                };

                const user: CustomJwtPayload = jwtDecode<CustomJwtPayload>(refreshToken);

                if (!user.id) {
                    navigationRef.reset({
                        index: 0,
                        routes: [{ name: 'login' }],
                    })
                    return;
                }

                const response = await getTokenFromRefreshToken(refreshToken, user.id);
                const newAccessToken = response?.data.accessToken;
                const newRefreshToken = response?.data.refreshToken;
                const payload = response?.data.payload;

                if (!newAccessToken || !newRefreshToken || !payload?.id || !payload?.username || !payload?.email || !payload?.full_name || !payload?.phone) {
                    navigationRef.reset({
                        index: 0,
                        routes: [{ name: 'login' }],
                    })
                    return;
                };
                const { id, username, email, full_name, phone } = payload;

                await setDataStorage(ACCESS_TOKEN, newAccessToken);
                await setDataStorage(REFRESH_TOKEN, newRefreshToken);
                const userDetail = { id, username, email, full_name, phone };
                set({ isLoading: false, userDetail: userDetail, isToast: null });
                navigationRef.reset({
                    index: 0,
                    routes: [{ name: 'navHome' }],
                })
                // ToastSuccess('Login error', 'Vui lòng đăng nhập lại!', 2000, callBack)
            } catch (error: any) {
                set({ isLoading: false, isToast: 'Vui lòng đăng nhập lại!' });
                ToastError('Login error', 'Vui lòng đăng nhập lại!')
                navigationRef.reset({
                    index: 0,
                    routes: [{ name: 'login' }],
                })
            } finally {
                set({ isLoading: false });
            }
        }
    }
))
