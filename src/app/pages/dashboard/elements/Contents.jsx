import { Image, StyleSheet, Text, View } from 'react-native';
import React, { } from 'react';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import image1 from '../../../assets/img.jpg';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 1,
        title: 'Explore Upcoming and Nearby Events \n',
        text: 'In publishing and graphic design, Lorem is a placeholder text commonly ',
        image: image1,
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Web Have Modern Events Calendar Feature \n',
        text: 'In publishing and graphic design, Lorem is a placeholder text commonly ',
        image: image1,
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'To Look Up More Events or Activities Nearby By Map \n',
        text: ' In publishing and graphic design, Lorem is a placeholder text commonly ',
        image: image1,
        backgroundColor: '#22bcb5',
    }
];


const Contents = ({ navigation }) => {
    const { textLight, backgroundStyle, skyBlue } = useModeColor();

    const _renderItem = ({ item }) => {
        return (
            <View style={[styles.slide]}>
                <Image source={item.image} style={[styles.image]} />
                <View style={[styles.contentContainer, {}]}>
                    <Text style={[styles.title, { color: textLight }]}>{item.title}</Text>
                    <Text style={[styles.text, { color: textLight }]}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const renderLabel = (label) => {
        return <Text style={{ color: textLight, fontWeight: '500' }}>{label}</Text>
    };

    const handleDone = () => {
        navigation.navigate('login');
    }

    return (
        <View style={[backgroundStyle, styles.container]}>
            <AppIntroSlider
                data={slides}
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
        top: '20%'


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
    }
})