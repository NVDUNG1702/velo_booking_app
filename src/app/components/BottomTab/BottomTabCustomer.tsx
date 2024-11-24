import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SIZES } from '../../constans/size';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import BottomTabIcon from './BottomTabIcon';
import { useModeColor } from '../../hooks/ColorMode/UseModeTheme';

export default function BottomTabCustomer({ descriptors, state, navigation }: BottomTabBarProps) {
    const MARGIN = 20;
    const TAB_BAR_WIDTH = SIZES.W - (2 * MARGIN);
    const TAB_WIDTH = TAB_BAR_WIDTH / 4;
    state.routes.length;

    const slidingAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(TAB_WIDTH * state.index) }]
        }
    });

    const { isDarkMode } = useModeColor();

    return (
        <View style={[
            styles.container, styles.shadow,
            {
                width: TAB_BAR_WIDTH,
                bottom: MARGIN,
                backgroundColor: isDarkMode ? 'black' : '#ffffff',
                boxShadow: `1px 1px 5px 1px ${isDarkMode ? 'rgba(0, 0, 0, 1)' : '#d5d5d5'}`
            }
        ]}
        >
            <Animated.View style={[{ width: TAB_WIDTH }, slidingAnimation, styles.slidingContainer]}>
                <View style={[styles.sliding, { backgroundColor: isDarkMode ? '#2f2f2f' : '#f6f6f6', boxShadow: `0px 0px 4px 1px ${isDarkMode ? '#868686' : '#d5d5d5'}` }]} />
            </Animated.View>

            {
                state.routes.map((route, index) => {
                    const options = descriptors[route?.key]?.options;
                    const isFocused = index === state.index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <Pressable
                            key={route.key}
                            accessibilityRole='button'
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                        >
                            <View style={[styles.contentContainer]}>
                                <BottomTabIcon route={route.name} focused={isFocused} />
                            </View>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 70,
        flexDirection: 'row',
        backgroundColor: 'black',
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    slidingContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sliding: {
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    shadow: {
        // boxShadow: "1px 1px 7px 2px",
        // shadowColor: 'rgba(0, 0, 0, 1)',
        // shadowOffset: { height: 1, width: 2 },
        // shadowRadius: 10,
        // shadowOpacity: 4
    }
})