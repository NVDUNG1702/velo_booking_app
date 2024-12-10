import React, { useState } from 'react';
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

interface DetailSportComplexProps {
    route: RouteProp<StackParamListNav, 'detailSportComplex'>;
    navigation: StackNavigationProp<StackParamListNav, 'detailSportComplex'>;
}

const DetailSportComplex: React.FC<DetailSportComplexProps> = ({ route, navigation }) => {
    const { data } = route.params;
    const [isTab, setTab] = useState(1);
    const { isDarkMode, skyBlue, textLight } = useModeColor();

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

    return (
        <LayoutComponent >
            <ScrollView >
                {/* Banner Section */}
                <View style={styles.bannerContainer}>
                    <Image
                        source={{
                            uri: 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder for no image
                        }}
                        style={styles.bannerImage}
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowLeftIcon />
                    </TouchableOpacity>
                </View>

                {/* Avatar and Title Section */}
                <View style={styles.header}>
                    <Image
                        source={{
                            uri: 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder for no avatar
                        }}
                        style={styles.avatar}
                    />
                    <View style={styles.headerContent}>
                        <Text style={styles.title}>{data.name}</Text>
                        <View style={styles.ratingContainer}>
                            <StarRating rating={parseFloat(data.evaluation_sport)} />
                            <Text style={styles.rating}>{data.evaluation_sport}</Text>
                        </View>
                        <Text style={styles.description}>{data.description}</Text>
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
                </View>

                {/* Tabs Section (Placeholder for Navigation) */}
                <FlatList
                    data={tabs}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    isTab === item.id ? styles.tabActive : {},
                                ]}
                                onPress={() => setTab(item.id)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        isTab === item.id ? styles.tabTextActive : {},
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    style={styles.tabs}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', gap: 10 }} // Đảm bảo các tab được bố trí đều nhau
                />
                {/* Detail Section */}
                {
                    isTab === 1 && (
                        <View style={styles.details}>
                            <View style={styles.detailRow}>
                                <LocationIcon color={skyBlue} />
                                <Text style={styles.detailText}>{data.location}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <TimeIcon color={skyBlue} />
                                <Text style={styles.detailText}>
                                    T2-CN: Sáng: {data.opening_time} - Chiều: {data.closing_time}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.detailRow} onPress={handleNavigation}>
                                <DirectionIcon color={skyBlue} size={SIZES.icon35} />
                                <Text style={[styles.detailText, { textDecorationLine: 'underline' }]}>
                                    Hướng dẫn đường đi
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.detailRow}>
                                <PhoneIcon color={skyBlue} />
                                <Text style={styles.detailText}>{data.phone[0]}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                {/* <Ionicons name="document-text-outline" size={20} color="#46BEF1" /> */}
                                <Text style={styles.detailText}>
                                    Mô tả: {data.description || 'Không có mô tả nào!'}
                                </Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </LayoutComponent >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    bannerContainer: {
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: 200,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 20,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: -50,
        borderRadius: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    headerContent: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
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
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginVertical: 5,
    },
    bookButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabs: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    tabText: {
        color: '#666',
        fontSize: 14,
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#46BEF1',
        paddingVertical: 10,
    },
    tabTextActive: {
        color: '#46BEF1',
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
    containerButton: {
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
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