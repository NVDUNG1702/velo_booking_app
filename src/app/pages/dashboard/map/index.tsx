import { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert, Button, Pressable, Modal, LogBox, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@maplibre/maplibre-react-native';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import YourLocationIcon from '../../../assets/IconComponents/YourLocationIcon';
import { API_KEY_MAP } from '../../../../config/API_KEY_MAP';
import { Image } from 'react-native';
import { sportComplexStore } from '../../../../stores/sportComplex/sportComplex.store';
import { SportComplex } from '../../../models/sportComplex';
import { BlurView } from '@react-native-community/blur';
import ButtonComponent from '../../../components/ButtonComponent';
import EyeHidIcon from '../../../assets/IconComponents/EyeHidIcon';
import { COLORS } from '../../../constans/color';
import StarRating from '../../../components/StarRating';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomPraramList } from '../../../navigations/BottomTabNavigation';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { BottomSheet, ListItem, Slider } from '@rneui/themed';
import SportsDetailCard from './components/SportDetailCard';
import { SIZES } from '../../../constans/size';
import SportDetail from './components/SportDetailCard';

// import PulseEffect from '../../../components/AnimationLocation';
const BADMINTON_IMG = require('../../../assets/image/image_icon-sports/marker_badminton.png');
const BASKETBALL_IMG = require('../../../assets/image/image_icon-sports/marker_basketball.png');
const FOOBALL_IMG = require('../../../assets/image/image_icon-sports/marker_football.png');
const MULTIPLE_IMG = require('../../../assets/image/image_icon-sports/marker_multiple.png');
const TENNIS_IMG = require('../../../assets/image/image_icon-sports/marker_tennis.png');
const PICKLEBALL_IMG = require('../../../assets/image/image_icon-sports/marker_pickleball.png');
const VOLLEYBALL_IMG = require('../../../assets/image/image_icon-sports/marker_volleyball.png');


const MAP_THEME = {
    DARK: `https://tiles.goong.io/assets/goong_map_dark.json?api_key=${API_KEY_MAP}`,
    LIGHT: `https://tiles.goong.io/assets/goong_map_web.json?api_key=${API_KEY_MAP}`,
}

interface MapProps {
    navigation: BottomTabNavigationProp<BottomPraramList, 'map'>
}

export const Map = ({ navigation }: MapProps) => {
    const mapRef = useRef<MapboxGL.MapViewRef | null>(null);
    LogBox.ignoreLogs([
        'MapLibre warning [event]:ParseStyle [code]:-1 [message]:line dasharray requires at least two elements'
    ]);

    // mapRef.current.setS
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const cameraRef = useRef<MapboxGL.CameraRef | null>(null);
    const { isDarkMode, skyBlue, textLight } = useModeColor();
    const mapStyle = isDarkMode ? MAP_THEME.DARK : MAP_THEME.LIGHT;
    const { loading, getListSportComplex, dataSportComplex } = sportComplexStore();
    const isFocused = useIsFocused();

    const [selectedMarker, setSelectedMarker] = useState<SportComplex>();
    const [modalVisible, setModalVisible] = useState(false);

    const onMarkerPress = (item: SportComplex) => {
        setSelectedMarker(item);
        setModalVisible(true);
    };

    useEffect(() => {
        getListSportComplex({ page: 1, limit: 50 });

        return () => {
            // setModalVisible(false);
            // setSelectedMarker(undefined);
            // MapboxGL.setConnected(false)
        }
    }, []);

    const zoomIn = () => {
        setZoomLevel(zoomLevel + 0.5);
    };

    const zoomOut = () => {
        setZoomLevel(zoomLevel - 0.5);
    };
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation([longitude, latitude]);
            },
            (error) => {
                Alert.alert('Lỗi lấy vị trí', error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
            }
        );
    };

    useEffect(() => {
        const checkPermissionAndFetchLocation = async () => {
            const hasPermission = await requestLocationPermission();
            if (hasPermission) {
                getCurrentLocation();
            } else {
                Alert.alert('Quyền vị trí bị từ chối', 'Bạn cần cấp quyền để hiển thị bản đồ.');
            }
        };
        checkPermissionAndFetchLocation();
    }, []);

    const handleShowDetail = () => {
        if (!selectedMarker) return;
        const data = { ...selectedMarker };
        setModalVisible(false);
        setSelectedMarker(undefined);
        navigation.navigate('detailSportComplex', {
            data: data,
        });
    }

    const handleCloseModel = () => {
        setSelectedMarker(undefined)
        setModalVisible(false)
    }

    const getCurrentLocationAndZoom = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newLocation: [number, number] = [longitude, latitude];

                setCurrentLocation(newLocation);

                if (cameraRef.current) {
                    cameraRef.current.flyTo(newLocation, 1000);
                    cameraRef.current.setCamera({
                        zoomLevel: 17, // Mức zoom
                        centerCoordinate: newLocation,
                        animationDuration: 1000,
                    });
                }
            },
            (error) => {
                Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại: ' + error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
            },
        );
    };

    // 
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedSportType, setSelectedSportType] = useState<string | null>(null);

    const handleSelectSport = (type: string | null) => {
        setSelectedSportType(type);
    };

    return (
        <View style={[styles.container, { flex: isFocused ? 1 : 0 }]}>
            <View style={styles.containerMenu}>
                {/* Thanh Tìm Kiếm */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sân..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholderTextColor={COLORS.black}
                />

                {/* Danh Sách Loại Sân */}
                <FlatList
                    data={sportTypes.filter((type) =>
                        type.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.sportTypeItem,
                                selectedSportType === item.type && styles.sportTypeItemSelected,
                            ]}
                            onPress={() => handleSelectSport(item.type)}
                        >
                            {item.type !== null && (
                                <Image
                                    source={getMarkerImage(item.type)}
                                    style={styles.sportTypeIcon}
                                    resizeMode="contain"
                                />
                            )}
                            <Text
                                style={[
                                    styles.sportTypeText,
                                    selectedSportType === item.type && styles.sportTypeTextSelected,
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                {/* <View style={{ width: '70%' }}>
                    <Slider
                        maximumValue={100}
                        minimumValue={0}
                        step={1}
                        allowTouchTrack
                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                    />
                </View> */}
            </View>
            {currentLocation ? (
                <>
                    <MapboxGL.MapView
                        ref={mapRef}
                        style={styles.map}
                        styleURL={mapStyle}
                        zoomEnabled={true}
                        logoEnabled={false}
                        scrollEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={true}
                        surfaceView={false}
                    // preferredFramesPerSecond={1}
                    >
                        <MapboxGL.Camera
                            ref={cameraRef}
                            // zoomLevel={zoomLevel}
                            centerCoordinate={currentLocation}
                            animationDuration={100}
                            followUserLocation
                            followUserMode={MapboxGL.UserTrackingMode.FollowWithHeading}
                            animationMode="moveTo"

                        // minZoomLevel={12}
                        >

                        </MapboxGL.Camera>

                        {!loading && dataSportComplex?.data.map((item, i) => {
                            if (selectedSportType !== null && selectedSportType !== item.marker) return;
                            return (
                                <MapboxGL.PointAnnotation
                                    key={item.id}
                                    id={item.id.toString()}
                                    coordinate={[parseFloat(item.longitude), parseFloat(item.latitude)]}
                                    // coordinate={listData[i].coordinates}
                                    draggable={false}
                                    onSelected={() => onMarkerPress(item)}
                                    anchor={{ x: 0.5, y: 0.5 }}
                                >
                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={getMarkerImage(item.marker)}
                                            style={{ width: 27, height: 27 }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </MapboxGL.PointAnnotation>
                            )
                        })}
                        <MapboxGL.UserLocation
                            showsUserHeadingIndicator
                        >

                        </MapboxGL.UserLocation>
                    </MapboxGL.MapView>
                    <View style={styles.controls}>
                        <Pressable
                            onPress={getCurrentLocationAndZoom}
                        >
                            <YourLocationIcon color={skyBlue} />
                        </Pressable>
                        {/* <Button title="+" onPress={zoomIn} />
                        <Button title="-" onPress={zoomOut} /> */}
                    </View>
                </>
            ) : (
                <View style={styles.loading}>
                    <Text>Đang tải bản đồ...</Text>

                </View>
            )}

            {selectedMarker && modalVisible && (
                <SportDetail data={selectedMarker} handleCloseModel={handleCloseModel} />
            )}

            {/* <BottomSheet isVisible={modalVisible} >
                {
                    selectedMarker && <SportsDetailCard data={selectedMarker} />
                }
                <ButtonComponent
                    // style={styles.closeButton}
                    label='close'
                    onPress={() => {
                        setSelectedMarker(undefined)
                        setModalVisible(false)
                    }}
                />
            </BottomSheet> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    map: {
        // flex: 1,
        width: '100%',
        height: '100%'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },


    // menu
    containerMenu: {
        position: 'absolute',
        top: 50, // Nổi lên trên cùng
        left: 0,
        right: 0,
        // backgroundColor: '#FFF',
        // padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 99,
        alignItems: 'center'
    },
    searchInput: {
        height: 40,
        backgroundColor: '#EFEFEF',
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        width: '98%',
        color: COLORS.black
    },

    sportTypeItem: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 3,
        marginHorizontal: 5,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    sportTypeItemSelected: {
        backgroundColor: COLORS.skyBlue,
    },
    sportTypeIcon: {
        height: 25,
        width: 25
    },
    sportTypeText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    sportTypeTextSelected: {
        color: '#FFF',
    },
});



const EMarkerSports = {
    BADMINTON: 'BADMINTON',
    BASKETBALL: 'BASKETBALL',
    FOOBALL: 'FOOBALL',
    MULTIPLE: 'MULTIPLE',
    TENNIS: 'TENNIS',
    PICKLEBALL: 'PICKLEBALL',
    VOLLEYBALL: 'VOLLEYBALL',
};

const getMarkerImage = (type: string | null) => {
    switch (type) {
        case "BADMINTON":
            return BADMINTON_IMG;
        case "BASKETBALL":
            return BASKETBALL_IMG;
        case "FOOBALL":
            return FOOBALL_IMG;
        case "MULTIPLE":
            return MULTIPLE_IMG;
        case "TENNIS":
            return TENNIS_IMG;
        case "PICKLEBALL":
            return PICKLEBALL_IMG;
        case "VOLLEYBALL":
            return VOLLEYBALL_IMG;
        default:
            return null;
    }
};

const sportTypes = [
    { id: '0', name: 'Tất cả', type: null },
    { id: '1', name: 'Tổng hợp', type: EMarkerSports.MULTIPLE },
    { id: '2', name: 'Bóng Đá', type: EMarkerSports.FOOBALL },
    { id: '3', name: 'Bóng Rổ', type: EMarkerSports.BASKETBALL },
    { id: '4', name: 'Tennis', type: EMarkerSports.TENNIS },
    { id: '5', name: 'Cầu Lông', type: EMarkerSports.BADMINTON },
    { id: '6', name: 'Pickleball', type: EMarkerSports.PICKLEBALL },
    { id: '7', name: 'Bóng Chuyền', type: EMarkerSports.VOLLEYBALL },
];