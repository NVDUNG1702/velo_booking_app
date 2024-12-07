import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import SearchCircleIcon from '../../../../../assets/IconComponents/SearchCircle'
import { SIZES } from '../../../../../constans/size'
import { useModeColor } from '../../../../../hooks/ColorMode/UseModeTheme';
import { UseTyping } from '../../../../../hooks/typeing/useTypeing';

export default function ButtonSearch() {
    const { isDarkMode, textLight } = useModeColor();
    const { currentText } = UseTyping({ textList: ["Tìm kiếm theo vị trí gần nhất", "Tìm kiếm theo đánh giá tốt nhất"] });

    return (
        <Pressable
            style={({ pressed }) => {
                return [
                    {
                        width: '90%',
                        height: 50,
                        borderRadius: 10,
                        // borderWidth: 1,
                        borderColor: '#797979',
                        backgroundColor: isDarkMode ? "#282828" : 'white',
                        paddingHorizontal: 20,
                        boxShadow: isDarkMode ? `2px 2px 12px 0px ${'#777777'}` : `0 0 12px 2px rgba(0, 0, 0, 0.1)`,
                        flexDirection: 'row',
                        alignItems: 'center',
                        transform: pressed ? [{ scale: .95 }] : [],
                        opacity: pressed ? .5 : 1,
                        marginBottom: 20
                    }
                ]
            }}
        >
            <SearchCircleIcon size={SIZES.icon25} />
            <Text style={{ color: textLight, marginStart: 10 }}>{currentText}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({})