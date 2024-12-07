import React, { useEffect, useState } from 'react';
import Loading from './elements/Loading';
import Contents from './elements/Contents';
import { StackNavigationProp } from '@react-navigation/stack';
import Navigation, { StackParamListNav } from '../../navigations/Navigation';
import { getDataStorage, removeDataStorage } from '../../untils/localStorage';
import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER, SHOW_INTRO } from '../../constans';
import { authStore } from '../../../stores/auth/auth.store';

type Props = {
    navigation: StackNavigationProp<StackParamListNav, 'intro'>;
};

export default function Intro({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const { loginWithToken } = authStore();

    useEffect(() => {
        const login = async () => {
            const showIntro = await getDataStorage(SHOW_INTRO);
            if (showIntro !== '1') {
                setIsLoading(false);
                return;
            }
            const remember = await getDataStorage(REMEMBER);
            if (remember !== '1') {
                await removeDataStorage(ACCESS_TOKEN);
                await removeDataStorage(REFRESH_TOKEN);
                navigation.navigate('login')
                return;
            }
            loginWithToken();
        }
        setTimeout(() => {
            login()
        }, 2000)
    }, []);

    return (
        isLoading ? <Loading /> : <Contents navigation={navigation} />
    )
}
