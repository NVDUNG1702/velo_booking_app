import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { sportComplexStore } from '../../../../stores/sportComplex/sportComplex.store';
import LoadingComponent from '../../../components/LoadingComponent';
import { RefreshControl, TextInput } from 'react-native-gesture-handler';
import ListItem from './component/ItemList';
import { SIZES } from '../../../constans/size';
import LayoutComponent from '../../../layouts/LayoutComponent';
import LogoutIcon from '../../../assets/IconComponents/LogoutIcon';
import LogoIcon from '../../../assets/IconComponents/LogoIcon';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomPraramList } from '../../../navigations/BottomTabNavigation';

interface ListPageProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'list'>
}

const ListPage = ({ navigation }: ListPageProps) => {
    const { loading, getListSportComplex, dataSportComplex } = sportComplexStore();
    const [refresh, setRefresh] = useState(false);
    const { skyBlue, isDarkMode } = useModeColor();

    useEffect(() => {
        getListSportComplex({ page: 1 })
    }, []);

    const handleRefresh = () => {
        getListSportComplex(dataSportComplex?.currentPage);
    }

    return (
        <LayoutComponent >
            <View style={[styles.container]}>
                <LoadingComponent loading={loading} />
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
                </View>
                {dataSportComplex && (
                    <FlatList
                        data={dataSportComplex.data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ListItem item={item} navigation={navigation} />}
                        showsVerticalScrollIndicator={false}
                        refreshing={refresh}
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
            </View>
        </LayoutComponent>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        flex: 1,
        fontSize: 16,
        height: 40,
        color: '#333',
    },
});

export default ListPage;