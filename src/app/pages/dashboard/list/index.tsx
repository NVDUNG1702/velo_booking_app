import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native';
import { sportComplexStore } from '../../../../stores/sportComplex/sportComplex.store';
import LoadingComponent from '../../../components/LoadingComponent';
import { RefreshControl, TextInput } from 'react-native-gesture-handler';
import ListItem from './component/ItemList';
import { SIZES } from '../../../constans/size';
import LayoutComponent from '../../../layouts/LayoutComponent';
import LogoIcon from '../../../assets/IconComponents/LogoIcon';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomPraramList } from '../../../navigations/BottomTabNavigation';
import axios from 'axios';
import { Modal } from 'react-native';
import { COLORS } from '../../../constans/color';


interface Province {
    code: number;
    name: string;
    districts: District[];
}

interface District {
    code: number;
    name: string;
}

interface ListPageProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'list'>
}

const ListPage = ({ navigation }: ListPageProps) => {
    const { loading, getListSportComplex, dataSportComplex } = sportComplexStore();
    const [refresh, setRefresh] = useState(false);
    const { skyBlue, isDarkMode, textLight, backgroundStyle } = useModeColor();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    const [isProvinceModalVisible, setProvinceModalVisible] = useState(false);
    const [isDistrictModalVisible, setDistrictModalVisible] = useState(false);

    const [provinceSearch, setProvinceSearch] = useState('');
    const [districtSearch, setDistrictSearch] = useState('');

    useEffect(() => {
        getListSportComplex({ page: 1, limit: 50 })
    }, []);

    const handleRefresh = () => {
        getListSportComplex({ page: dataSportComplex?.currentPage, limit: 50 });
    }

    // province
    const fetchProvinces = async () => {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/?depth=2');
            setProvinces(response.data);
            setLoading(false);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể tải danh sách tỉnh thành');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    const handleProvinceSelect = (provinceName: string) => {
        const selected = provinces.find((p) => p.name === provinceName);
        setSelectedProvince(provinceName);
        setDistricts(selected?.districts || []);
        setSelectedDistrict(null); // Reset quận huyện khi thay đổi tỉnh
        setProvinceModalVisible(false); // Ẩn modal
    };

    const handleDistrictSelect = (districtName: string) => {
        setSelectedDistrict(districtName);
        setDistrictModalVisible(false); // Ẩn modal
    };

    const filteredProvinces = provinces.filter((province) =>
        province.name.toLowerCase().includes(provinceSearch.toLowerCase())
    );

    const filteredDistricts = districts.filter((district) =>
        district.name.toLowerCase().includes(districtSearch.toLowerCase())
    );

    const handleSelectAllProvinces = () => {
        setSelectedProvince(null);
        setSelectedDistrict(null); // Reset quận huyện
        setDistricts([]); // Xóa danh sách quận huyện
        setProvinceModalVisible(false); // Ẩn modal
    };

    return (
        <LayoutComponent >
            <View style={[styles.container]}>
                {/* <LoadingComponent loading={loading} /> */}
                <View>
                    <View style={styles.header}>
                        <Text style={[styles.logo, { color: skyBlue }]}>VELO</Text>
                        <LogoIcon />
                    </View>
                    <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#c2c2c2' : 'white' }]}>
                        <TextInput
                            placeholder="Search..."
                            style={[styles.searchInput,]}
                            placeholderTextColor={'black'}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 15 }}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#007BFF" />
                        ) : (
                            <>
                                <TouchableOpacity
                                    style={styles.selectButton}
                                    onPress={() => setProvinceModalVisible(true)}
                                >
                                    <Text
                                        style={[styles.selectButtonText, {color: textLight}]}
                                    >
                                        {selectedProvince || 'Chọn tỉnh thành'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.selectButton}
                                    onPress={() =>
                                        selectedProvince
                                            ? setDistrictModalVisible(true)
                                            : Alert.alert('Thông báo', 'Bạn cần chọn tỉnh thành trước!')
                                    }
                                >
                                    <Text
                                        style={[styles.selectButtonText, {color: textLight}]}
                                    >
                                        {selectedDistrict || 'Chọn quận huyện'}
                                    </Text>
                                </TouchableOpacity>

                                {/* {selectedProvince && selectedDistrict && (
                                    <View style={styles.resultContainer}>
                                        <Text style={styles.resultText}>Tỉnh: {selectedProvince}</Text>
                                        <Text style={styles.resultText}>Quận huyện: {selectedDistrict}</Text>
                                    </View>
                                )} */}
                            </>
                        )}
                    </View>
                </View>
                {dataSportComplex && (
                    <FlatList
                        data={dataSportComplex.data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ListItem item={item} navigation={navigation} />}
                        showsVerticalScrollIndicator={false}
                        refreshing={loading}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={handleRefresh}
                                colors={['#007BFF']} // Màu Android
                                tintColor="#007BFF" // Màu iOS
                                title="Đang làm mới..."
                                titleColor="#007BFF"
                            />
                        }
                        contentContainerStyle={{ width: '100%', }}
                        style={{ width: '100%', marginBottom: 50, padding: 0, marginHorizontal: 0 }}
                    />
                )}

                {/* Modal Chọn Tỉnh Thành */}
                <Modal visible={isProvinceModalVisible} animationType="slide">
                    <View style={[styles.modalContainer, backgroundStyle]}>
                        <TextInput
                            placeholder="Tìm kiếm tỉnh thành..."
                            style={styles.searchInput}
                            value={provinceSearch}
                            onChangeText={setProvinceSearch}
                        />

                        <FlatList
                            data={filteredProvinces}
                            keyExtractor={(item) => item.code.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleProvinceSelect(item.name)}
                                >
                                    <Text style={[styles.modalText, {color: textLight}]}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        {/* Nút Tất Cả và Hủy */}
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleSelectAllProvinces()}
                            >
                                <Text style={styles.actionText}>Tất Cả</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => setProvinceModalVisible(false)}
                            >
                                <Text style={styles.actionText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal Chọn Quận Huyện */}
                <Modal visible={isDistrictModalVisible} animationType="slide">
                    <View style={[styles.modalContainer, backgroundStyle]}>
                        <TextInput
                            placeholder="Tìm kiếm quận huyện..."
                            style={styles.searchInput}
                            value={districtSearch}
                            onChangeText={setDistrictSearch}
                        />

                        <FlatList
                            data={filteredDistricts}
                            keyExtractor={(item) => item.code.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleDistrictSelect(item.name)}
                                >
                                    <Text style={[styles.modalText, {color: textLight}]}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        {/* Nút Tất Cả và Hủy */}
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => {
                                    setSelectedDistrict(null);
                                    setDistrictModalVisible(false);
                                }}
                            >
                                <Text style={styles.actionText}>Tất Cả</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => setDistrictModalVisible(false)}
                            >
                                <Text style={styles.actionText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </LayoutComponent>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        width: '90%'
    },
    searchInput: {
        fontSize: 16,
        height: 40,
        color: '#333',
    },

    selectButton: {
        width: '40%',
        height: 30,
        // backgroundColor: '',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#cacaca',
        borderWidth: 1

    },
    selectButtonText: {
        color: 'black',
        fontSize: SIZES.h6,
        fontWeight: '500',
    },
    resultContainer: {
        marginTop: 30,
        padding: 16,
        backgroundColor: '#f0f8ff',
        borderRadius: 10,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 40
    },
    modalItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalText: {
        fontSize: 16,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    actionButton: {
        padding: 10,
        backgroundColor: COLORS.skyBlue,
        borderRadius: 5,
        alignItems: 'center',
        width: '48%',
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ListPage;