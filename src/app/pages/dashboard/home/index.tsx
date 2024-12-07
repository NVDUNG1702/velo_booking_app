import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BlurView } from '@react-native-community/blur';
import ScrollFullView from '../../../layouts/LayoutScrollFullView';
import HeaderHome, { stylesHeaderHome } from './elements/header';
import { slider, typeSlider } from '../../../datas/home';
import { SIZES } from '../../../constans/size';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import LayoutComponent from '../../../layouts/LayoutComponent';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import NotifiIcon from '../../../assets/IconComponents/NotifiIcon';
import SearchCircleIcon from '../../../assets/IconComponents/SearchCircle';
const image = require('../../../assets/image/avatar.jpg');

interface HomeProps {
    navigation: any;
}

interface ItemSliderProps {
    item: typeSlider;
}

export default function Home({ navigation }: HomeProps) {
    const { backgroundStyle, isDarkMode, textLight } = useModeColor();

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const styleHidden = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, 150],
            [1, 0],
            'clamp'
        );
        const scale = interpolate(
            scrollY.value,
            [100, 200],
            [1, 0],
            'clamp'
        )
        return {
            opacity: opacity,
            transform: [{ scale: scale }]
        };
    });

    const styleShow = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [100, 200],
            [0, 1],
            'clamp'
        );

        const scale = interpolate(
            scrollY.value,
            [100, 150],
            [0, 1],
            'clamp'
        );
        return {
            opacity: opacity,
            // transform: [{ scale: scale }],
        };
    });



    const ItemSlider = ({ item }: ItemSliderProps) => {
        const IOS = Platform.OS === 'ios';

        return (
            <View style={[styles.sliderContainer]}>
                <View style={[styles.card, { boxShadow: isDarkMode ? `0 0 6px 2px rgba(0, 0, 0, .4)` : `0 0 6px 2px rgba(0, 0, 0, 0.5)` }]}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                    <View style={styles.blurContainer}>
                        <BlurView
                            style={styles.blurView}
                            blurType="dark"
                            blurAmount={IOS ? 10 : 20}
                            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.1)"
                        />
                        <Text style={{ fontSize: SIZES.h0, color: 'white', fontWeight: '800' }}>
                            {item.title.toLocaleUpperCase()}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <LayoutComponent fullView={true} backgroundStatusBar="transparent">
            {/* Header cố định */}
            <Animated.View style={[styles.newHeader, styleShow, { boxShadow: ` ${isDarkMode ? '0 0 10px 3px rgba(0, 0, 0, 0.8)' : '0 0 5px 3px rgba(186, 230, 255, 0.8)'}`, backgroundColor: isDarkMode ? 'black' : 'white' }]}>
                <TouchableOpacity>
                    <SearchCircleIcon size={SIZES.icon35} />
                </TouchableOpacity>
                <View style={[stylesHeaderHome.containerImage, { borderColor: 'white', boxShadow: `0 0 5px 2px ${isDarkMode ? textLight : 'rgba(144, 214, 255, 0.8)'}`, width: 50, height: 50 }]}>
                    <Image
                        source={image}
                        style={[stylesHeaderHome.image,]}
                        resizeMode='cover'
                    />
                </View>
                <TouchableOpacity>
                    <NotifiIcon />
                </TouchableOpacity>
            </Animated.View>

            <ScrollFullView
                style={[backgroundStyle]}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                {/* Header gốc */}
                <HeaderHome styleHidden={[styleHidden]} />

                <View
                    style={[
                        {
                            width: SIZES.W,
                            height: SIZES.H * 0.6,
                        },
                    ]}
                >
                    <Carousel
                        layout="default"
                        data={slider}
                        renderItem={ItemSlider}
                        sliderWidth={SIZES.W}
                        itemWidth={SIZES.W * 0.7}
                        sliderHeight={SIZES.H * 0.6}
                        itemHeight={SIZES.H * 0.6}
                    />
                </View>
                <View style={{ width: '100%', height: 500 }} />
            </ScrollFullView>
        </LayoutComponent>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        height: '90%',
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
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
        alignItems: 'center',
        overflow: 'hidden',
    },
    blurView: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    fixedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    fixedHeaderText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    newHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        paddingTop: 40,
        flexDirection: 'row',
        paddingHorizontal: '5%',
        paddingBottom: 10,
        borderBottomLeftRadius: 30
    },
    newHeaderText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});