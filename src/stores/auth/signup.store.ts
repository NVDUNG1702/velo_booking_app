import { create } from "zustand";
import { UserLoginPayload } from "../../app/models/authModel/auth.model";
import { removeDataStorage, setDataStorage } from "../../app/untils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER } from "../../app/constans";
import { navigationRef } from "../../app/navigations/Navigation";
import { checkDataSignUp, login, loginWithToken, signup } from "../../app/apis/auth/auth.api";
import { getErrorResponse } from "../../app/untils/message";
import { ToastError, ToastSuccess } from "../../app/untils/ToastMessage/toast";
import { SignUpCheckAccountPayLoad, SignUpPayLoad } from "../../app/models/authModel/signup.model";

interface SignUpStoreState {
    isLoading: boolean;
    dataLogin: SignUpCheckAccountPayLoad | null;
    checkDataSignUp: (payload: SignUpCheckAccountPayLoad) => void;
    signup: (payload: SignUpPayLoad) => void;
};

export const signupStore = create<SignUpStoreState>()((set) => (
    {
        isLoading: false,
        dataLogin: null,

        checkDataSignUp: async (payload) => {
            try {
                set({ isLoading: true });
                const data = await checkDataSignUp(payload);
                ToastSuccess('Send OTP', 'Sen OTP success');
                set({ dataLogin: payload })
                navigationRef.navigate('login', {
                    screen: 'otpSignUp'
                })
            } catch (error: any) {
                const validMessages = [
                    "Username already exists.",
                    "Email already exists.",
                    "Phone number already exists."
                ];
                const { message } = error?.response?.data;
                if (message && validMessages.includes(message)) {
                    ToastError('Check SignUp Error', message)
                } else {
                    ToastError('Check SignUp Error', 'Something wrong!')
                }
            } finally {
                set({ isLoading: false })
            }
        },

        signup: async (payload) => {
            try {
                set({ isLoading: true });
                const data = await signup(payload);
                
            } catch (error) {

            }
        }


    }
))
