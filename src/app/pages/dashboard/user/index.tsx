import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { BottomPraramList } from '../../../navigations/BottomTabNavigation'
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme'
import LayoutComponent from '../../../layouts/LayoutComponent'
import ScrollFullView from '../../../layouts/LayoutScrollFullView'
import { COLORS } from '../../../constans/color'
import { SIZES } from '../../../constans/size'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated'
import ItemSwitchMenuProfile from './Component/ItemMenuProfile'
const avatar = require('../../../assets/image/avatar.jpg');
interface UserProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'user'>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


export default function User({ navigation }: UserProps) {
    const { backgroundStyle, textLight, isDarkMode } = useModeColor();
    const IOS = Platform.OS === 'ios';

    const valueOpacity = useSharedValue<number>(1);
    const handlePressIn = () => {
        valueOpacity.value = 0.9
    }

    const handlePressOut = () => {
        valueOpacity.value = 1
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
                                marginTop: IOS ? 15 : 60,
                                transform: [{ scale: pressed ? 0.95 : 1 }],
                                boxShadow: `0 0 20px 2px rgba(0, 0, 0, 0.1)`,
                                backgroundColor: isDarkMode ? 'black' : 'white',
                                opacity: pressed ? 0.6 : 1
                            }]
                    }}
                >

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', overflow: 'hidden', width: '100%', height: '100%', borderRadius: 20 }}>
                        {/* <BlurView
                            // blurType='dark'
                            blurAmount={10}
                            style={{ width: '100%', height: '100%', position: 'absolute', paddingVertical: 20, left: 0, borderRadius: 20 }}
                            reducedTransparencyFallbackColor='(rgba(225, 225, 225, 0.3)'

                        /> */}
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
                <ItemSwitchMenuProfile/>
            </ScrollFullView>
        </LayoutComponent>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        width: '90%',
        borderRadius: 20,
        height: 140,
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