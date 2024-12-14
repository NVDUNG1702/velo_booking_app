import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamListNav } from '../../../navigations/Navigation';
import ArrowLeftIcon from '../../../assets/IconComponents/ArrowLeftIcon';
import StarRating from '../../../components/StarRating';
import LocationIcon from '../../../assets/IconComponents/LocationIcon';
import { FlatList } from 'react-native-gesture-handler';
import TimeIcon from '../../../assets/IconComponents/TimeIcon';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import DirectionIcon from '../../../assets/IconComponents/DirectionsIcon';
import { SIZES } from '../../../constans/size';
import PhoneIcon from '../../../assets/IconComponents/PhoneIcon';
import HeartIcon from '../../../assets/IconComponents/IconHeart';
import LayoutComponent from '../../../layouts/LayoutComponent';
import ScrollFullView from '../../../layouts/LayoutScrollFullView';
import { COLORS } from '../../../constans/color';

const imageList = [
    'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

interface DetailSportComplexProps {
    route: RouteProp<StackParamListNav, 'detailSportComplex'>;
    navigation: StackNavigationProp<StackParamListNav, 'detailSportComplex'>;
}

const DetailSportComplex: React.FC<DetailSportComplexProps> = ({ route, navigation }) => {
    const { data } = route.params;
    const [isTab, setTab] = useState(1);
    const { isDarkMode, skyBlue, textLight, backgroundStyle } = useModeColor();

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNavigation = () => {
        if (data.url_sport_complex[0]) {
            // Handle navigation logic here (e.g., open map)
        }
    };

    const handleDetailSlot = () => {
        navigation.navigate('detailSlot', {
            sportComplexId: data.id,
        })
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % imageList.length;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 4000);
        return () => clearInterval(timer);
    }, [currentIndex]);


    return (
        <LayoutComponent fullView>
            {/* Banner Section */}
            <ScrollView style={[styles.container, backgroundStyle]}>
                <View style={styles.bannerContainer}>
                    <FlatList
                        data={imageList}
                        ref={flatListRef}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.bannerImage} resizeMode="cover" />
                        )}
                        style={{ width: '100%', height: '100%' }}
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowLeftIcon color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <View style={[{ backgroundColor: isDarkMode ? 'black' : 'white' }]}>
                    {/* Avatar and Title Section */}
                    <View style={[styles.header]}>
                        <Image
                            source={{
                                uri: 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder for no avatar
                            }}
                            style={[styles.avatar, { borderColor: isDarkMode ? 'black' : 'white' }]}
                        />
                        <View style={styles.headerContent}>
                            <Text style={[styles.title, { color: textLight }]}>{data.name}</Text>
                            <View style={styles.ratingContainer}>
                                <StarRating rating={parseFloat(data.evaluation_sport)} />
                                <Text style={styles.rating}>{data.evaluation_sport}</Text>
                            </View>
                            <Text style={styles.description}>{data.description}</Text>
                        </View>

                    </View>
                    <View style={[styles.containerButton]}>
                        <TouchableOpacity style={[styles.bookButton, { backgroundColor: '#ff9393' }]}>
                            <HeartIcon color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bookButton, { backgroundColor: skyBlue, width: '70%' }]}
                            onPress={handleDetailSlot}
                        >
                            <Text style={styles.bookButtonText}>Đặt sân</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Tabs Section (Placeholder for Navigation) */}
                    <FlatList
                        data={tabs}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item.id.toString()}
                                style={[

                                    styles.tab,
                                    {
                                        backgroundColor: isDarkMode ? '#5d5d5d' : COLORS.white,
                                    },
                                    isTab === item.id && styles.tabActive,
                                ]}
                                onPress={() => setTab(item.id)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        {
                                            color: isDarkMode ? COLORS.white : COLORS.black
                                        },
                                        isTab === item.id && styles.tabTextActive,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        )}
                        style={styles.tabs}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: 'space-between' }}
                    />
                </View>

                {/* Detail Section */}
                {isTab === 1 && (
                    <View style={[styles.details, { backgroundColor: isDarkMode ? COLORS.black : COLORS.white }]}>
                        <View style={styles.detailRow}>
                            <LocationIcon color={skyBlue} />
                            <Text style={[styles.detailText, { color: textLight }]}>{data.location}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <TimeIcon color={skyBlue} />
                            <Text style={[styles.detailText, { color: textLight }]}>
                                T2-CN: Sáng {data.opening_time} - Chiều {data.closing_time}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.detailRow} onPress={handleNavigation}>
                            <DirectionIcon color={skyBlue} size={30} />
                            <Text style={[styles.detailText, styles.linkText, { color: skyBlue }]}>
                                Hướng dẫn đường đi
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.detailRow}>
                            <PhoneIcon color={skyBlue} />
                            <Text style={[styles.detailText, { color: textLight }]}>{data.phone[0]}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailText, { color: textLight }]}>
                                Mô tả: {data.description || 'Không có mô tả nào!'}
                            </Text>
                        </View>
                    </View>
                )}

            </ScrollView>
        </LayoutComponent >
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%'
    },
    bannerContainer: {
        width: '100%',
        height: 200,
        // position: 'relative',
    },
    bannerImage: {
        width: SIZES.W,
        height: 200
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 20,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // height: 120
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        borderWidth: 4,
        borderColor: COLORS.white,
        marginTop: -60
    },
    headerContent: {
        alignItems: 'flex-start',
        width: '55%',
        justifyContent: 'center',
        paddingTop: 10
    },
    title: {
        fontSize: SIZES.h4,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    rating: {
        marginLeft: 5,
        fontSize: 16,
        color: '#FFD700',
    },
    description: {
        fontSize: SIZES.h6,
        color: '#666',
        // textAlign: 'center',
        marginVertical: 5,
    },
    bookButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabs: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
    },
    tab: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    tabText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    tabActive: {
        backgroundColor: '#46BEF1',
        borderBottomWidth: 2,
        borderBottomColor: '#46BEF1',
    },
    tabTextActive: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    details: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        minHeight: 150,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    detailText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333',
    },
    linkText: {
        textDecorationLine: 'underline',
        color: '#007BFF',
    },
    containerButton: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        paddingHorizontal: 20
    }
});

export default DetailSportComplex;

const tabs = [
    { id: 1, label: 'Giới thiệu' },
    { id: 2, label: 'Tin tức' },
    { id: 3, label: 'Hình ảnh' },
    { id: 4, label: 'Dịch vụ' },
    { id: 5, label: 'Đánh giá' },
    { id: 6, label: 'Khuyến mãi' },
];