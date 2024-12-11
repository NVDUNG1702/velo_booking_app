import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@maplibre/maplibre-react-native';
import LocationIcon from '../../../assets/IconComponents/LocationIcon';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import YourLocationIcon from '../../../assets/IconComponents/YourLocationIcon';
import { API_KEY_MAP } from '../../../../config/API_KEY_MAP';




const MAP_THEME = {
    DARK: `https://tiles.goong.io/assets/goong_map_dark.json?api_key=${API_KEY_MAP}`,
    LIGHT: `https://tiles.goong.io/assets/goong_map_web.json?api_key=${API_KEY_MAP}`,
}

export const Map = () => {
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const cameraRef = useRef<MapboxGL.CameraRef | null>(null);
    const { isDarkMode, skyBlue } = useModeColor();
    const mapStyle = isDarkMode ? MAP_THEME.DARK : MAP_THEME.LIGHT;

    const zoomIn = () => {
        setZoomLevel(zoomLevel + 1);
    };

    const zoomOut = () => {
        setZoomLevel(zoomLevel - 1);
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

    return (
        <View style={styles.container}>
            {currentLocation ? (
                <>
                    <MapboxGL.MapView
                        style={styles.map}
                        styleURL={mapStyle}
                        zoomEnabled={true}
                        logoEnabled={false}
                        scrollEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={true}
                    >
                        <MapboxGL.Camera
                            ref={cameraRef}
                            zoomLevel={zoomLevel}
                            centerCoordinate={currentLocation}
                        />
                    </MapboxGL.MapView>
                    <View style={styles.controls}>
                        <View>
                            <YourLocationIcon color={skyBlue} />
                        </View>
                        <Button title="+" onPress={zoomIn} />
                        <Button title="-" onPress={zoomOut} />
                    </View>
                </>
            ) : (
                <View style={styles.loading}>
                    <Text>Đang tải bản đồ...</Text>
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
});