import React, { useEffect, useState } from 'react';
import Loading from './elements/Loading';
import Contents from './elements/Contents';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamListNav } from '../../navigations/Navigation';

type Props = {
    navigation: StackNavigationProp<StackParamListNav, 'Dashboard'>;
};

export default function Dashboard({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, []);

    return (
        isLoading ? <Loading /> : <Contents navigation={navigation} />
    )
}

