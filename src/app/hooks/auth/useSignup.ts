import * as Yup from 'yup';
import React, { useState } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { UserSignupData } from '../../models/authModel/auth.model';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastError, ToastSuccess } from '../../untils/ToastMessage/toast';
import { signup } from '../../apis/auth/auth.api';
import { getErrorResponse } from '../../untils/message';

const schema = Yup.object().shape({
    username: Yup.string().required('Please enter your username!').min(4, "Must be unique and between 4 and 50 characters.").max(50, "Must be unique and between 4 and 50 characters."),
    email: Yup.string().email('Is valid email').required('Please enter your email!'),
    full_name: Yup.string().required('Plese enter your full name!'),
    phone: Yup.string().required('Please enter your phone number!').matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Is valid phone number!'),
    password: Yup.string().required('Please enter your password!')
    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //     'Password must be at least 8 characters long and include at least one letter and one number!'
    // )
});

type StateUseSignup = {
    isLoading: boolean,
    isError: string | null
}

export default function useSignup() {
    const [stateSignUp, setStateSignUp] = useState<StateUseSignup>({ isLoading: false, isError: null });

    const { control, clearErrors, handleSubmit, formState: { errors, } } = useForm<UserSignupData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            full_name: '',
            password: '',
            phone: '',
            username: ''
        }
    });

    const onSubmit: SubmitHandler<UserSignupData> = async (data) => {
        setStateSignUp({ isError: null, isLoading: true });
        try {
            const response = await signup(data);
            ToastSuccess("SignUp successful", `Hello ${response.full_name}!`);
        } catch (error) {
            ToastError("SignUp error", `${getErrorResponse(error)}`);
            setStateSignUp({ ...stateSignUp, isError: getErrorResponse(errors) });
        } finally {
            setStateSignUp({ isError: null, isLoading: false });
        }
    };

    const handleError = (errors: FieldErrors<UserSignupData>) => {
        const fields: { field: keyof UserSignupData; label: string }[] = [
            { field: 'username', label: 'Username' },
            { field: 'email', label: 'Email' },
            { field: 'full_name', label: 'Full Name' },
            { field: 'password', label: 'Password' },
            { field: 'phone', label: 'Phone' },
        ];

        let delay = 0;

        fields.forEach(({ field, label }) => {
            if (errors?.[field]?.message) {
                setTimeout(() => {
                    ToastError('Validation Error', `${label}: ${errors[field]?.message}`);
                }, delay);
                delay += 2500;
            };
        });
    };

    return {
        isLoading: stateSignUp.isLoading,
        control,
        handleSubmit: handleSubmit(onSubmit, handleError),
        errors
    }
}
