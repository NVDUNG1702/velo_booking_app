import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React, { } from 'react';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import AppIntroSlider from 'react-native-app-intro-slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamListNav } from '../../../navigations/Navigation';
import { slidesData } from '../../../datas/intro';
import { setDataStorage } from '../../../untils/localStorage';
import { SHOW_INTRO } from '../../../constans';

interface ContentProps {
    navigation: StackNavigationProp<StackParamListNav, 'intro'>
}

export type TypeItem = {
    key: string | number,
    title: string,
    text: string,
    image: ImageSourcePropType,
    backgroundColor: string
}

const Contents = ({ navigation }: ContentProps) => {
    const { textLight, backgroundStyle, skyBlue } = useModeColor();

    const _renderItem = ({ item }: { item: TypeItem }) => {
        return (
            <View style={[styles.slide]} key={item.key}>
                <Image source={item.image} style={[styles.image]} />
                <View style={[styles.contentContainer, {}]}>
                    <Text style={[styles.title, { color: textLight }]}>{item.title}</Text>
                    <Text style={[styles.text, { color: textLight }]}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const renderLabel = (label: string): any => {
        return <Text style={{ color: textLight, fontWeight: '500' }}>{label}</Text>
    };

    const handleDone = async () => {
        await setDataStorage(SHOW_INTRO, '1');
        navigation.navigate('login');
    }

    return (
        <View style={[backgroundStyle, styles.container]}>
            <AppIntroSlider
                data={slidesData}
                renderItem={_renderItem}
                showPrevButton
                showSkipButton
                dotStyle={{ backgroundColor: textLight }}
                activeDotStyle={{ width: 20, backgroundColor: skyBlue }}
                skipLabel={renderLabel('Skip')}
                doneLabel={renderLabel('Done')}
                nextLabel={renderLabel('Next')}
                prevLabel={renderLabel('Back')}
                onDone={handleDone}
            />
        </View>
    )
}

export default Contents

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '90%',
        height: '30%',
        objectFit: 'contain',
        position: 'absolute',
        top: '20%',
        filter: 'blur(1)'

    },
    slide: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    contentContainer: {
        width: '100%',
        height: '40%',
        borderTopRightRadius: '20%',
        borderTopLeftRadius: '20%',
        paddingTop: '20%',
        paddingHorizontal: '10%'
    },
    title: {
        fontSize: 24,
        fontWeight: '600'
    },
    text: {

    }
})