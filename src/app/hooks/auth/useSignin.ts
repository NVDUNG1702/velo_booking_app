import { UserLoginForm } from '../../models/authModel/auth.model';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { ToastError } from '../../untils/ToastMessage/toast';
import { authStore } from '../../../stores/auth.store';
import { getErrorResponse } from '../../untils/message';

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
        if (isError) {
            ToastError('Login error', getErrorResponse(isError));

        }
    }

    const handleErrorValid = (errors: FieldErrors<UserLoginForm>) => {
        if (errors?.username?.message) {
            ToastError('Validation Error', errors?.username?.message);
        }
        setTimeout(() => {
            if (errors?.password?.message) {
                ToastError('Validation Error', errors?.password?.message);
            }
        }, errors?.username?.message ? 2500 : 0);
    }

    return {
        remember,
        setRemember,
        handleSubmit: handleSubmit(onSubmit, handleErrorValid),
        errors,
        control,
        clearErrors,
    }
};
