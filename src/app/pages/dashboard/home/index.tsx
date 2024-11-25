import React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BlurView } from '@react-native-community/blur';
import ScrollFullView from '../../../layouts/LayoutScrollFullView';
import HeaderHome from './elements/header';
import { slider } from '../../../datas/home';
import { SIZES } from '../../../constans/size';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';

interface HomeProps {
    navigation: any;
}

const ItemSlider = ({ item }: any) => {
    const IOS = Platform.OS === 'ios';

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.card}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.blurContainer}>
                    <BlurView
                        style={styles.blurView}
                        blurType="dark"
                        blurAmount={IOS ? 10 : 30}
                    // reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.3)"
                    >

                    </BlurView>
                    <Text style={{ fontSize: SIZES.h0, color: 'white', fontWeight: '800' }}>
                        {item.title}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default function Home({ navigation }: HomeProps) {
    const { backgroundStyle } = useModeColor();
    return (
        <ScrollFullView style={[backgroundStyle]}>
            <ImageBackground>
                <HeaderHome />
                <View style={[{ width: '100%', height: SIZES.H * 0.7, }]}>
                    <Carousel
                        layout="default"
                        data={slider}
                        renderItem={ItemSlider}
                        sliderWidth={SIZES.W}
                        itemWidth={SIZES.W * 0.7}
                    />
                </View>
                <View style={{ width: '100%', height: 500 }}>

                </View>
            </ImageBackground>
        </ScrollFullView>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    blurContainer: {
        height: '20%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    blurView: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
});