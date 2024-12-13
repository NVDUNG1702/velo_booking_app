import { createStackNavigator } from '@react-navigation/stack';
import { createNavigationContainerRef, NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import Intro from '../pages/intro';
import LoginNavigation from './LoginNavigation';
import BottomTabNavigation from './BottomTabNavigation';
import EditProfile from '../pages/user/editProfile';
import DetailSportComplex from '../pages/sportComplex/detailSportComplex';
import { SportComplex } from '../models/sportComplex';
import DetailSlot from '../pages/sportComplex/detailSlot';

export type StackParamListNav = {
    dashboard: undefined,
    login?: { screen?: string },
    navHome: undefined,
    intro: undefined,
    editProfile: undefined,
    detailSportComplex: {
        data: SportComplex,
    },
    detailSlot: {
        sportComplexId: number
    }
}

export const navigationRef = createNavigationContainerRef<StackParamListNav>();

const Stack = createStackNavigator<StackParamListNav>();

const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='intro'>
                <Stack.Screen name='intro' component={Intro} />
                <Stack.Screen name='login' component={LoginNavigation} />
                <Stack.Screen name='navHome' component={BottomTabNavigation} />
                <Stack.Screen name='editProfile' component={EditProfile} />
                <Stack.Screen name='detailSportComplex' component={DetailSportComplex} />
                <Stack.Screen name='detailSlot' component={DetailSlot} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
