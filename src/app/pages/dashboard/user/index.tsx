import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { BottomPraramList } from '../../../navigations/BottomTabNavigation'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme'
import LayoutComponent from '../../../layouts/LayoutComponent'
import ScrollFullView from '../../../layouts/LayoutScrollFullView'
import { COLORS } from '../../../constans/color'
import { SIZES } from '../../../constans/size'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated'
import ItemSwitchMenuProfile from './Component/ItemSwitchProfile'
import DarkModeIcon from '../../../assets/IconComponents/DarkModeIcon'
import ItemButtonProfile from './Component/ItemButtonProfile'
import LogoutIcon from '../../../assets/IconComponents/LogoutIcon'
import { authStore } from '../../../../stores/auth/auth.store'
import InfoIcon from '../../../assets/IconComponents/InfoIcon'
const avatar = require('../../../assets/image/avatar.jpg');
interface UserProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'user'>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


export default function User({ navigation }: UserProps) {
    const { backgroundStyle, textLight, isDarkMode, toggleColorMode } = useModeColor();
    const IOS = Platform.OS === 'ios';
    const { logout } = authStore();

    const valueOpacity = useSharedValue<number>(1);
    const handlePressIn = () => {
        valueOpacity.value = 0.9
    }

    const handlePressOut = () => {
        valueOpacity.value = 1
    }

    const handleEditProfile = () => {
        navigation.navigate('editProfile')
    }

    const styleInfo = useAnimatedStyle(() => {
        return {
            opacity: withTiming(valueOpacity.value),
            transform: [{ scale: withTiming(valueOpacity.value) }],
        }

    });



    return (
        <LayoutComponent >
            <ScrollFullView style={[backgroundStyle]}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPress={handlePressOut}
                    style={({ pressed }) => {
                        return [
                            styles.infoContainer,
                            {
                                transform: [{ scale: pressed ? 0.95 : 1 }],
                                boxShadow: `0 0 20px 2px rgba(0, 0, 0, 0.1)`,
                                backgroundColor: isDarkMode ? 'black' : 'white',
                                opacity: pressed ? 0.6 : 1
                            }]
                    }}
                >

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', overflow: 'hidden', width: '100%', height: '100%', borderRadius: 20 }}>
                        <View style={[styles.avatarContainer]}>
                            <Image
                                source={avatar}
                                style={{ width: 100, height: 100 }}
                                resizeMode='cover'
                            />
                        </View>
                        <View>
                            <Text style={[styles.nameLabel, { color: textLight }]}>My profile</Text>
                            <Text style={[styles.name, { color: textLight }]}>Nguyễn Văn Dũng</Text>
                        </View>
                    </View>
                </Pressable>
                <ItemButtonProfile
                    label='Edit profile'
                    icon={<InfoIcon color='white' />}
                    bgIcon='#009dff'
                    onClick={handleEditProfile}
                />
                <ItemSwitchMenuProfile
                    icon={<DarkModeIcon color='white' />}
                    label="Dark Mode"
                    value={isDarkMode}
                    onToggle={toggleColorMode}
                    backgroundColor={isDarkMode ? 'black' : 'white'}
                    textColor={isDarkMode ? 'white' : 'black'}
                    bgIcon='orange'
                />
                <ItemButtonProfile
                    label='Logout'
                    icon={<LogoutIcon color='white' />}
                    bgIcon='#009dff'
                    onClick={logout}
                />
            </ScrollFullView>
        </LayoutComponent>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        width: '90%',
        borderRadius: 20,
        height: 140,
        marginBottom: 20
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLORS.skyBlue
    },
    nameLabel: {
        lineHeight: 40,
        fontSize: SIZES.h3,
        color: COLORS.white
    },
    name: {
        fontSize: SIZES.h2,
        fontWeight: '500',
        color: COLORS.white
    }
})