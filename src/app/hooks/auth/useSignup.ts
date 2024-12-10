import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { UserSignupData } from '../../models/authModel/auth.model';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastError, ToastSuccess } from '../../untils/ToastMessage/toast';
import { signup } from '../../apis/auth/auth.api';
import { getErrorResponse } from '../../untils/message';
import { modelStore } from '../../../stores/model.store';
import { signupStore } from '../../../stores/auth/signup.store';

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

export default function useSignup() {
    const { checkDataSignUp, isLoading } = signupStore();
    const [countryCode, setCountryCode] = useState('+84');

    const { control, handleSubmit, formState: { errors }, getValues, reset } = useForm<UserSignupData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: 'duynguyen210420@gmail.com',
            full_name: 'vandung',
            password: 'dung1306',
            phone: '0346477717',
            username: 'dung1306'
        }
    });

    const onSubmit: SubmitHandler<UserSignupData> = async (data) => {
        data.phone = data.phone.replace(/^0/, countryCode);
        checkDataSignUp(data);
        reset();
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
        isLoading: isLoading,
        control,
        handleSubmit: handleSubmit(onSubmit, handleError),
        errors,
        getValues,
        countryCode,
        setCountryCode
    }
}
