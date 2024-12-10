import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { bookingStore } from '../../../../stores/booking';
import LayoutComponent from '../../../layouts/LayoutComponent';
import HeaderComponent from '../../../components/HeaderComponent';
import { RouteProp } from '@react-navigation/native';
import { StackParamListNav } from '../../../navigations/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { BookingStatus } from '../../../models/booking';
import LoadingComponent from '../../../components/LoadingComponent';
import BoxStatus from './components/BoxStatus';

const BOOKING_STATUS = {
    EMPTY: 'empty',
    ORDERING: 'ordering',
    PLACED: 'placed',
    LOCKED: 'locked',
};

const statusColors = {
    [BOOKING_STATUS.EMPTY]: '#ffffff', // White for empty
    [BOOKING_STATUS.ORDERING]: '#f0c674', // Yellow for ordering
    [BOOKING_STATUS.PLACED]: '#ff6f61', // Red for placed
    [BOOKING_STATUS.LOCKED]: '#d3d3d3', // Grey for locked
};

interface DetailSlotProps {
    route: RouteProp<StackParamListNav, 'detailSlot'>;
    navigation: StackNavigationProp<StackParamListNav, 'detailSlot'>;
}

const DetailSlot = ({ route, navigation }: DetailSlotProps) => {
    const { fields, getSlots, loading } = bookingStore();
    const [selectedSlots, setSelectedSlots] = useState<any[]>([]);
    const { skyBlue } = useModeColor();
    const isField = fields && fields.length > 0;

    useEffect(() => {
        getSlots();
    }, []);
    // useEffect(() => {
    //     console.log(fields);

    // }, [fields]);

    const toggleSlotSelection = (fieldId: number, slot: any) => {
        const isSelected = selectedSlots.some(
            (selected) => selected.fieldId === fieldId && selected.slotId === slot.id
        );

        if (isSelected) {
            // Nếu đã chọn, thì bỏ chọn
            setSelectedSlots((prev) =>
                prev.filter(
                    (selected) =>
                        !(selected.fieldId === fieldId && selected.slotId === slot.id)
                )
            );
        } else {
            // Nếu chưa chọn, thì thêm vào
            setSelectedSlots((prev) => [
                ...prev,
                { fieldId, slotId: slot.id, slot },
            ]);
        }
    };

    const HEIGHT_TABLE = 50;
    const WIDTH_BOX_TABLE = 100

    return (
        <LayoutComponent >
            <LoadingComponent loading={loading} />
            <HeaderComponent navigation={navigation} title='Đặt sân' />

            {
                isField && !loading &&
                (
                    <View style={{ width: '100%', backgroundColor: skyBlue }}>
                        <ScrollView
                            horizontal
                        >
                            <View style={{ width: '100%', padding: 10, flexDirection: 'row' }}>
                                <BoxStatus label='Sân trống' color='white' />
                                <BoxStatus label='Sân khoá' color='#AAAAAA' />
                                <BoxStatus label='Sân đang chờ' color='#FAE205' />
                                <BoxStatus label='Sân sân đã đặt' color='#E72A2A' />
                            </View>
                        </ScrollView>

                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <View style={{ width: '20%' }}>
                                <View
                                    style={{ width: '100%', height: HEIGHT_TABLE, backgroundColor: skyBlue }}
                                >
                                </View>
                                {
                                    fields.map((item, i) => {
                                        return (
                                            <View
                                                style={{ width: '100%', height: HEIGHT_TABLE, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', backgroundColor: skyBlue }}
                                            >
                                                <Text style={{ color: 'white' }}>sân{' '}{i + 1}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={{ width: '80%' }}>
                                <ScrollView style={{ width: '100%', height: HEIGHT_TABLE }}
                                    horizontal
                                >
                                    <View>
                                        <View style={{ width: '100%', height: HEIGHT_TABLE, flexDirection: 'row', backgroundColor: skyBlue }}>
                                            {
                                                fields[0].slots.map((item, index) => {
                                                    return (
                                                        <View style={{ width: WIDTH_BOX_TABLE, height: HEIGHT_TABLE, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ color: 'white' }}>{item.start_time}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>


                                        {
                                            fields.map((item, i) => {
                                                return (
                                                    <View style={{ width: '100%', height: HEIGHT_TABLE, flexDirection: 'row' }}>
                                                        {
                                                            item.slots.map((item, index) => {
                                                                const isBooked = item.is_booked;
                                                                const backgroundColor = isBooked === BOOKING_STATUS.EMPTY ? 'white' : isBooked === BOOKING_STATUS.LOCKED ? '#AAAAAA' : isBooked === BOOKING_STATUS.ORDERING ? skyBlue : '#FAE205'
                                                                return (
                                                                    <View style={{ width: WIDTH_BOX_TABLE, height: HEIGHT_TABLE, borderWidth: 0.5, borderColor: '#a8a8a8', backgroundColor: backgroundColor }}>

                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>

                            </View>
                        </View>
                    </View>
                )
            }
        </LayoutComponent>
    );
};

const styles = StyleSheet.create({

});


export default DetailSlot;