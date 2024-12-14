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
import { SportComplex } from '../../../models/sportComplex';
import Nodata from '../../../components/Nodata';


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

    const [search, setSearch] = useState('');

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
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

    const handleProvinceSelect = (provinceSelect: Province) => {
        const selected = provinces.find((p) => p.name === provinceSelect.name);
        setSelectedProvince(provinceSelect);
        setDistricts(selected?.districts || []);
        setSelectedDistrict(null);
        setProvinceModalVisible(false);
    };

    const handleDistrictSelect = (district: District) => {
        setSelectedDistrict(district);
        setDistrictModalVisible(false);
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

    const filterSportComplex = (data: SportComplex[] | undefined, provinceId: number | undefined, districtId: number | undefined, search: string) => {
        if (!data) return [];

        // Lọc theo provinceId nếu có
        if (provinceId) {
            data = data.filter(item => item?.provincesId === provinceId.toString());
        }

        // Lọc theo districtId nếu có
        if (districtId) {
            data = data.filter(item => item?.districtId === districtId.toString());
        }

        // Lọc theo từ khóa search nếu có
        if (search.trim() !== "") {
            const searchLower = search.toLowerCase();
            data = data.filter(
                item =>
                    item.name.toLowerCase().includes(searchLower) ||
                    item.description.toLowerCase().includes(searchLower)
            );
        }

        return data;
    };

    const dataFilter = filterSportComplex(dataSportComplex?.data, selectedProvince?.code, selectedDistrict?.code, search)


    return (
        <LayoutComponent >
            <View style={[styles.container]}>
                <LoadingComponent loading={loading} />
                {
                    !loading &&
                    (
                        <>
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
                                        value={search}
                                        onChangeText={setSearch}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 15 }}>

                                    <TouchableOpacity
                                        style={styles.selectButton}
                                        onPress={() => setProvinceModalVisible(true)}
                                    >
                                        <Text
                                            style={[styles.selectButtonText, { color: textLight }]}
                                        >
                                            {selectedProvince?.name || 'Chọn tỉnh thành'}
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
                                            style={[styles.selectButtonText, { color: textLight }]}
                                        >
                                            {selectedDistrict?.name || 'Chọn quận huyện'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {dataSportComplex && dataFilter.length !== 0
                                ? (
                                    <FlatList
                                        data={dataFilter}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({ item }) => <ListItem item={item} navigation={navigation} />}
                                        showsVerticalScrollIndicator={false}
                                        // refreshing={loading}
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
                                )
                                : (
                                    <Nodata />
                                )
                            }
                        </>
                    )
                }

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
                                    onPress={() => handleProvinceSelect(item)}
                                >
                                    <Text style={[styles.modalText, { color: textLight }]}>{item.name + ' - ' + item.code}</Text>
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
                                    onPress={() => handleDistrictSelect(item)}
                                >
                                    <Text style={[styles.modalText, { color: textLight }]}>{item.name + ' - ' + item.code}</Text>
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