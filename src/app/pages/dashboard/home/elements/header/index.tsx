import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useModeColor } from '../../../../../hooks/ColorMode/UseModeTheme';
import NotifiIcon from '../../../../../assets/IconComponents/NotifiIcon';
import { SIZES } from '../../../../../constans/size';
import LocationIcon from '../../../../../assets/IconComponents/LocationIcon';
const image = require('../../../../../assets/image/avatar.jpg');

export default function HeaderHome() {
    const { skyBlue, bg, isDarkMode, textLight, darkGrayLight } = useModeColor();
    return (
        <View style={[styles.container]}>
            <View style={[styles.containerTop]}>
                <View style={{ width: '10%' }} />
                <View style={[styles.containerImage, { borderColor: textLight, boxShadow: `0 0 5px 2px ${textLight}` }]}>
                    <Image
                        source={image}
                        style={[styles.image,]}

                        resizeMode='cover'
                    />
                </View>
                <View style={{}}>
                    <TouchableOpacity>
                        <NotifiIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                <Text style={[styles.textWelcome, { color: textLight }]}>
                    Hello, {' '}
                    <Text style={[styles.textWelcome, styles.textName, { color: isDarkMode ? skyBlue : "rgb(16, 12, 144)" }]}>
                        My friend
                    </Text>
                </Text>
                <Text style={[styles.textLocation, { color: darkGrayLight }]}><LocationIcon size={13} />{' '}Your location</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 10,
        alignItems: 'center',
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