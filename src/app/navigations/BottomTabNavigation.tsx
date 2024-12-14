import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabCustomer from '../components/BottomTab/BottomTabCustomer';
import { Favorite, Home, List, Map, User } from '../pages/dashboard';
import { SportComplex } from '../models/sportComplex';


const BottomTab = createBottomTabNavigator();

export type BottomPraramList = {
    home?: undefined;
    favorite?: undefined;
    list?: undefined;
    user?: undefined;
    map?: undefined;
    editProfile?: undefined;
    detailSportComplex: {
        data: SportComplex
    },
    detailSlot: {
        sportComplexId?: number
    }
}

export default function BottomTabNavigation() {
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
            }}
            tabBar={(props) => {
                return (
                    <BottomTabCustomer
                        descriptors={props.descriptors}
                        navigation={props.navigation}
                        state={props.state}
                        insets={props.insets}
                    />
                )
            }}
        >
            <BottomTab.Screen name='home' component={Home} />
            <BottomTab.Screen name='map' component={Map} />
            <BottomTab.Screen name='favorite' component={Favorite} />
            <BottomTab.Screen name='list' component={List} />
            <BottomTab.Screen name='user' component={User} />
        </BottomTab.Navigator>
    )
}
