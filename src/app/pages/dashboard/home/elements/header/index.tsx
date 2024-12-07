import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useRef } from 'react'
import { useModeColor } from '../../../../../hooks/ColorMode/UseModeTheme';
import NotifiIcon from '../../../../../assets/IconComponents/NotifiIcon';
import { SIZES } from '../../../../../constans/size';
import LocationIcon from '../../../../../assets/IconComponents/LocationIcon';
import { useSafeAreaStyle } from '../../../../../hooks/size/usesafeArea';
import SearchCircleIcon from '../../../../../assets/IconComponents/SearchCircle';
import { UseTyping } from '../../../../../hooks/typeing/useTypeing';
import ButtonSearch from '../buttonSearch';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
const image = require('../../../../../assets/image/avatar.jpg');

interface HeaderHomeProps {
    styleHidden?: (ViewStyle | AnimatedStyle<ViewStyle>)[];
}

export default React.memo(function HeaderHome({ styleHidden }: HeaderHomeProps) {
    const { skyBlue, isDarkMode, textLight, darkGrayLight } = useModeColor();
    const { PADDING_TOP } = useSafeAreaStyle();

    return (
        <Animated.View style={[stylesHeaderHome.container, { paddingTop: PADDING_TOP }, styleHidden]}>
            <View style={[stylesHeaderHome.containerTop]}>
                <View style={{ width: '10%' }} />
                <View style={[stylesHeaderHome.containerImage, { borderColor: textLight, boxShadow: `0 0 5px 2px ${textLight}` }]}>
                    <Image
                        source={image}
                        style={[stylesHeaderHome.image,]}

                        resizeMode='cover'
                    />
                </View>
                <View style={{}}>
                    <TouchableOpacity>
                        <NotifiIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginVertical: 20, width: '100%', alignItems: 'center' }}>
                <Text style={[stylesHeaderHome.textWelcome, { color: textLight }]}>
                    Hello, {' '}
                    <Text style={[stylesHeaderHome.textWelcome, stylesHeaderHome.textName, { color: isDarkMode ? skyBlue : "rgb(16, 12, 144)" }]}>
                        My friend
                    </Text>
                </Text>
                <Text style={[stylesHeaderHome.textLocation, { color: darkGrayLight }]}><LocationIcon size={13} />{' '}Your location</Text>

            </View>

            <ButtonSearch />
        </Animated.View>
    )
});

export const stylesHeaderHome = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    containerTop: {
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerImage: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        borderRadius: '50%',
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'white',

    },
    image: {
        width: '100%',
        height: '100%',
    },
    textWelcome: {
        fontSize: SIZES.h0,
        fontWeight: '300',
        textAlign: 'center'
    },
    textName: {
        fontWeight: '700'
    },
    textLocation: {
        fontSize: SIZES.h4,
        textAlign: 'center',
        marginTop: 10
    }
})