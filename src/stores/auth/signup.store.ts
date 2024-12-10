import { create } from "zustand";
import { navigationRef } from "../../app/navigations/Navigation";
import { checkDataSignUp, signup } from "../../app/apis/auth/auth.api";
import { ToastError, ToastSuccess } from "../../app/untils/ToastMessage/toast";
import { SignUpCheckAccountPayLoad, SignUpPayLoad } from "../../app/models/authModel/signup.model";

interface SignUpStoreState {
    isLoading: boolean;
    dataSignUp: SignUpCheckAccountPayLoad | null;
    checkDataSignUp: (payload: SignUpCheckAccountPayLoad) => void;
    signup: (payload: SignUpPayLoad) => void;
};

export const signupStore = create<SignUpStoreState>()((set) => (
    {
        isLoading: false,
        dataSignUp: null,

        checkDataSignUp: async (payload) => {
            const currentRoute = navigationRef.getCurrentRoute();
            try {
                set({ isLoading: true });
                await checkDataSignUp(payload);
                const handleSuccess = () => {
                    set({ dataSignUp: payload })
                    if (currentRoute?.params?.screen !== 'otpSignUp') {
                        navigationRef.navigate('login', {
                            screen: 'otpSignUp'
                        })
                    }
                }
                ToastSuccess('Send OTP', 'Sen OTP success', 2000, handleSuccess);
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
                const callBack = () => {
                    navigationRef.navigate('login', {
                        screen: 'signin'
                    });
                }
                ToastSuccess('Signup Success', 'You have successfully registered an account!', 2000, callBack);

            } catch (error: any) {
                const validMessages = ['Invalid OTP!', 'OTP expired or not found']
                navigationRef.goBack();
                const { message } = error?.response?.data;
                if (message && validMessages.includes(message)) {
                    ToastError('SignUp Error', 'OTP expired or not found!')
                } else {
                    ToastError('SignUp Error', 'Something wrong!')
                }
            } finally {
                set({ isLoading: false });
            }
        }


    }
))
