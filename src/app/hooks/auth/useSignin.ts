import { UserLoginForm } from '../../models/authModel/auth.model';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { ToastError } from '../../untils/ToastMessage/toast';
import { authStore } from '../../../stores/auth.store';

const schema = Yup.object().shape({
    username: Yup.string().min(4, "Must be unique and between 4 and 50 characters.").max(50, "Must be unique and between 4 and 50 characters.").required('Please enter your username!'),
    password: Yup.string().min(6, "Please enter a password of at least 6 characters").required('Please enter your password!')
})

export default function useSignin() {
    const { isError, isLoading, login } = authStore();
    const [remember, setRemember] = useState(false);
    const { control, handleSubmit, formState: { errors }, clearErrors } = useForm<UserLoginForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<UserLoginForm> = async (data) => {
        login(data);
    }

    useEffect(() => {
        if (isError) {
            ToastError('Login error', isError);
        }
    }, [isError]);

    const handleErrorValid = (errors: FieldErrors<UserLoginForm>) => {
        const fields: { field: keyof UserLoginForm, label: string }[] = [
            { field: 'username', label: 'Username' },
            { field: 'password', label: 'Password' }
        ];

        let delay = 0;

        fields.forEach(({ field, label }) => {
            if (errors?.[field]?.message) {
                setTimeout(() => {
                    ToastError('Validation Error', `${label}: ${errors[field]?.message}`);
                }, delay);
                delay += 2500;
            }
        });
    };

    return {
        remember,
        setRemember,
        handleSubmit: handleSubmit(onSubmit, handleErrorValid),
        errors,
        control,
        clearErrors,
        isLoading
    }
};
