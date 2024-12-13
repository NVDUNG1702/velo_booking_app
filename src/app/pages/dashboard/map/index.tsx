import { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert, Button, Pressable, Modal, LogBox } from 'react-native';
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

    return (
        <View style={[styles.container, { flex: isFocused ? 1 : 0 }]}>
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
                        surfaceView={true}
                    >
                        <MapboxGL.Camera
                            ref={cameraRef}
                            zoomLevel={zoomLevel}
                            // centerCoordinate={currentLocation}
                            animationDuration={2000}
                            followUserLocation

                            followUserMode={MapboxGL.UserTrackingMode.Follow}
                        >

                        </MapboxGL.Camera>

                        {!loading && dataSportComplex?.data.map((item, i) => {
                            // console.log(item);

                            return (
                                <MapboxGL.PointAnnotation
                                    key={item.id}
                                    id={item.id.toString()}
                                    coordinate={[parseFloat(item.longitude), parseFloat(item.latitude)]}
                                    // coordinate={listData[i].coordinates}
                                    draggable={false}
                                    onSelected={() => onMarkerPress(item)}
                                >
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={getMarkerImage(item.marker)}
                                            style={{ width: 40, height: 40 }}
                                            resizeMode="contain" // Đảm bảo ảnh hiển thị đúng
                                        />
                                    </View>
                                    {/* <LocationIcon/> */}
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
                        <Button title="+" onPress={zoomIn} />
                        <Button title="-" onPress={zoomOut} />
                    </View>
                </>
            ) : (
                <View style={styles.loading}>
                    <Text>Đang tải bản đồ...</Text>

                </View>
            )}

            {selectedMarker && modalVisible && (
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <BlurView
                            style={{ width: '100%', height: '100%', position: 'absolute', }}
                            blurAmount={6}
                            blurType='light'
                        />
                        <Image
                            style={{ width: '100%', height: 200, borderWidth: 1, borderColor: 'white', marginBottom: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            resizeMode='cover'
                            source={{ uri: 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                        />
                        <View style={{ width: '100%', padding: 15, alignItems: 'center' }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.modalTitle]}>{selectedMarker.name}</Text>
                                <Pressable
                                    onPress={handleShowDetail}
                                >
                                    <EyeHidIcon status color={COLORS.white} />
                                </Pressable>
                            </View>
                            <Text style={styles.modalText}>Địa chỉ: {selectedMarker.location}</Text>
                            <Text style={styles.modalText}>Loại sân: {selectedMarker.marker}</Text>
                            <Text style={styles.modalText}>Đánh giá: <StarRating rating={parseFloat(selectedMarker.evaluation_sport)} /></Text>
                            <ButtonComponent
                                // style={styles.closeButton}
                                label='close'
                                onPress={() => {
                                    setSelectedMarker(undefined)
                                    setModalVisible(false)
                                }}
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // overflow: 'hidden'
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0

    },
    modalContent: {
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        width: '70%',
        color: COLORS.white
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
        width: '100%',
        color: COLORS.white
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
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

const getMarkerImage = (type: string) => {
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