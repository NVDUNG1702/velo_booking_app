import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';


interface SwitchProps {
    value1: string,
    value2: string,
    selected: string,
    setSelect: (value: string) => void
}

const SwitchComponent = ({ value1, value2, selected, setSelect }: SwitchProps) => {

    const translateX = useSharedValue(0);

    const { skyBlue, skyBlueDisabled, isDarkMode } = useModeColor();

    const handleSwitch = (type: string) => {
        setSelect(type);
        translateX.value = type === value1 ? 0 : 75;
    };

    const animatedIndicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(translateX.value) }],
    }));

    return (
        <View style={styles.container}>
            <Svg
                style={styles.svgBackground}
                viewBox="0 0 320 60"
                fill="none"
                preserveAspectRatio='none'
            >
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.5667 0.961914C10.2336 0.961914 9.9142 1.09422 9.67869 1.32973L0.367819 10.6406C0.132309 10.8761 0 11.1955 0 11.5286V49.9387C0 52.7129 2.24899 54.9619 5.02326 54.9619H305.433C305.766 54.9619 306.086 54.8296 306.321 54.5941L315.632 45.2832C315.868 45.0477 316 44.7283 316 44.3952V5.98517C316 3.2109 313.751 0.961914 310.977 0.961914H10.5667ZM314.744 38.6363L299.674 53.7061H5.02326C2.94256 53.7061 1.25581 52.0194 1.25581 49.9387V17.2875L8.7907 9.75261L16.3256 2.21773C16.3256 2.21773 308.896 2.21773 310.977 2.21773C313.057 2.21773 314.744 3.90447 314.744 5.98517V38.6363Z" fill={isDarkMode ? skyBlue : 'black'} />
                <Path d="M299.674 53.7061L314.744 38.6363V5.98517C314.744 3.90447 313.057 2.21773 310.977 2.21773H16.3256L8.7907 9.75261L1.25581 17.2875V49.9387C1.25581 52.0194 2.94256 53.7061 5.02326 53.7061H299.674Z" fill={isDarkMode ? 'rgba(0, 0, 0, .5)' : 'white'} />
            </Svg>

            <Animated.View
                style={[styles.indicator, animatedIndicatorStyle]}
            >
                <Svg
                    width={'100%'} height={'100%'}
                    viewBox={`0 0 350 ${"60"}`}
                    preserveAspectRatio="none"
                >
                    <Path d="M10.5667 0.961914C10.2336 0.961914 9.9142 1.09422 9.67869 1.32973L0.367819 10.6406C0.132309 10.8761 0 11.1955 0 11.5286V49.9387C0 52.7129 2.24899 54.9619 5.02326 54.9619H305.433C305.766 54.9619 306.086 54.8296 306.321 54.5941L315.632 45.2832C315.868 45.0477 316 44.7283 316 44.3952V5.98517C316 3.2109 313.751 0.961914 310.977 0.961914H10.5667ZM314.744 38.6363L299.674 53.7061H5.02326C2.94256 53.7061 1.25581 52.0194 1.25581 49.9387V17.2875L8.7907 9.75261L16.3256 2.21773C16.3256 2.21773 308.896 2.21773 310.977 2.21773C313.057 2.21773 314.744 3.90447 314.744 5.98517V38.6363Z" fill={skyBlueDisabled} />
                    <Path d="M299.674 53.7061L314.744 38.6363V5.98517C314.744 3.90447 313.057 2.21773 310.977 2.21773H16.3256L8.7907 9.75261L1.25581 17.2875V49.9387C1.25581 52.0194 2.94256 53.7061 5.02326 53.7061H299.674Z" fill={skyBlue} />
                </Svg>
            </Animated.View>

            <TouchableWithoutFeedback onPress={() => handleSwitch(value1)}>
                <View style={styles.option}>
                    <Text style={[styles.text, selected === value1 && styles.selectedText, ]}>
                        {value1}
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handleSwitch(value2)}>
                <View style={styles.option}>
                    <Text style={[styles.text, selected === value2 && styles.selectedText,]}>
                        {value2}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 40,
        display: 'flex',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
        // backgroundColor: 'white'
    },
    svgBackground: {
        position: 'absolute',
        width: '110%',
        height: '110%'
    },
    indicator: {
        position: 'absolute',
        height: '80%',
        width: '50%',
        left: 5

    },
    option: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%',
    },
    text: {
        fontSize: 16,
        color: '#5a5a5a',
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SwitchComponent;