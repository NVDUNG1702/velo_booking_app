import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@maplibre/maplibre-react-native';
import LocationIcon from '../../../assets/IconComponents/LocationIcon';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';

MapboxGL.setAccessToken(null); // Không cần API key với MapLibre

const MapScreen: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const camera = useRef(null);
    const { skyBlue } = useModeColor();
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
                <MapboxGL.MapView
                    style={styles.map}
                    styleURL={`https://tiles.goong.io/assets/goong_satellite.json?api_key=BWMkPYP6VIFnzqmqyOhZM5ZXmznyq6cSs5WE4ZUP`}
                    zoomEnabled={true}
                    logoEnabled={true}
                >
                    <MapboxGL.Camera
                        ref={camera}
                        zoomLevel={17}
                        centerCoordinate={currentLocation}
                    />
                    <MapboxGL.PointAnnotation
                        id="currentLocation"
                        coordinate={currentLocation}
                    >
                        <LocationIcon color={skyBlue} />
                    </MapboxGL.PointAnnotation>
                </MapboxGL.MapView>
            ) : (
                <View style={styles.loading}>
                    <Text>Đang tải bản đồ...</Text>
                </View>
            )}
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    marker: {
        width: 20,
        height: 20,
        backgroundColor: '#ff0000',
        borderRadius: 10,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});