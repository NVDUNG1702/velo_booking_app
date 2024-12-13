import React, { memo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import renderEllipsisText from '../../../../untils/EllipsisText';
import { SportComplex } from '../../../../models/sportComplex';
import StarRating from '../../../../components/StarRating';
import { useModeColor } from '../../../../hooks/ColorMode/UseModeTheme';
import { isValidUrl } from '../../../../untils/validationUrl';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomPraramList } from '../../../../navigations/BottomTabNavigation';

interface ListItemProps {
    item: SportComplex;
    navigation: BottomTabNavigationProp<BottomPraramList, 'list'>
}

const ListItem: React.FC<ListItemProps> = ({ item, navigation }) => {
    const [image, setImage] = useState(() => {
        const validImage = isValidUrl(item.avatar_image)
            ? item.avatar_image
            : 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
        return validImage;
    });
    const { isDarkMode, textLight, skyBlue } = useModeColor();

    const handleShowDetail = () => {
        navigation.navigate('detailSportComplex', {
            data: item
        })
    }

    return (
        <Pressable style={[styles.card, { backgroundColor: isDarkMode ? 'black' : 'white' }]}
            onPress={handleShowDetail}
        >
            <Image
                onError={() => setImage('https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')}
                source={{ uri: isValidUrl(item.avatar_image) ? 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' : 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={[styles.name, { color: isDarkMode ? '#afafaf' : 'black' }]}>{renderEllipsisText(item.name, 30)}</Text>
                <Text style={[styles.location, { color: textLight, opacity: isDarkMode ? 0.7 : 1 }]}>{renderEllipsisText(item.location, 15)}</Text>
                <StarRating rating={parseFloat(item.evaluation_sport)} />
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.bookButton, { backgroundColor: skyBlue, opacity: item.status_sport_complex === 'inactive' ? 0.7 : 1 }]}
                    disabled={item.status_sport_complex === 'inactive'}
                >
                    <Text style={styles.bookText}>Đặt lịch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreText}>•••</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '90%',
        margin: 'auto',
        marginBottom: 20
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    content: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    rating: {
        fontSize: 14,
        color: '#FFCC00',
    },
    actions: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    bookButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    bookText: {
        fontSize: 14,
        color: '#fff',
    },
    moreButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    moreText: {
        fontSize: 18,
        color: '#007BFF',
    },
});

export default memo(ListItem);