import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArrowLongLeft from '../../../../assets/IconComponents/ArrowLongLeftIcon';
import { useModeColor } from '../../../../hooks/ColorMode/UseModeTheme';

interface ItemButtonProfileProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    bgIcon?: string;
    colorIcon?: string;
}

export default function ItemButtonProfile({
    icon,
    label,
    bgIcon,
    onClick,
    colorIcon
}: ItemButtonProfileProps) {
    const { isDarkMode, textLight } = useModeColor();

    return (
        <Pressable
            style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}
            onPress={onClick}
        >
            <View style={styles.containerLabel}>
                <View style={[styles.containerIcon, { backgroundColor: bgIcon }]}>{icon}</View>
                <Text style={[styles.label, { color: textLight }]}>{label}</Text>
            </View>
            <View style={[{ transform: [{ rotate: '180deg' }] }]}>
                <ArrowLongLeft color={colorIcon}/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 70,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    containerIcon: {
        width: 30,
        height: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 20
    },
    containerLabel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchContainer: {
        width: 40,
        height: 20,
        borderRadius: 50,
        justifyContent: 'center',
        padding: 1
    },
    sliding: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 25
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});