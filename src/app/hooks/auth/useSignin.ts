import { UserLoginForm } from './../../models/auth.model';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ToastError } from '../../untils/ToastMessage/toast';

const schema = Yup.object().shape({
    username: Yup.string().min(4, "Must be unique and between 4 and 50 characters.").max(50, "Must be unique and between 4 and 50 characters.").required('Please enter your username!'),
    password: Yup.string().min(6, "Please enter a password of at least 6 characters").required('Please enter your password!')
})

export default function useSignin() {
    const [remember, setRemember] = useState(false);
    const { control, handleSubmit, formState: { errors }, clearErrors } = useForm<UserLoginForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<UserLoginForm> = (data) => {
        console.log(data, remember);
    }

    useEffect(() => {
        if (errors?.username?.message) {
            ToastError('Validation Error', errors?.username?.message);
        }
        setTimeout(() => {
            if (errors?.password?.message) {
                ToastError('Validation Error', errors?.password?.message);
            }
        }, errors?.username?.message ? 2500 : 0);
    }, [errors]);

    return {
        remember,
        setRemember,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        control,
        clearErrors
    }
};
