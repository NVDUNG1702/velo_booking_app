import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Button,
    Platform,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { bookingStore } from '../../../../stores/booking';
import LayoutComponent from '../../../layouts/LayoutComponent';
import HeaderComponent from '../../../components/HeaderComponent';
import { RouteProp } from '@react-navigation/native';
import { StackParamListNav } from '../../../navigations/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { SlotOrder } from '../../../models/booking';
import LoadingComponent from '../../../components/LoadingComponent';
import BoxStatus from './components/BoxStatus';
import { formatDate, formatTimeTable } from '../../../untils/formatTime';
import { isCheckTimeExpired } from '../../../untils/checkTimeExpired';
import { COLORS } from '../../../constans/color';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CalendarIcon from '../../../assets/IconComponents/IconCalendar';
import { SIZES } from '../../../constans/size';

interface DetailSlotProps {
    route: RouteProp<StackParamListNav, 'detailSlot'>;
    navigation: StackNavigationProp<StackParamListNav, 'detailSlot'>;
}

// import 'intl';
// import 'intl/locale-data/jsonp/vi';

const DetailSlot = ({ route, navigation }: DetailSlotProps) => {
    const { sportComplexId } = route.params;
    const { fields, getSlots, loading, updateDataBooKing, dataBoking } = bookingStore();
    const { skyBlue, isDarkMode, textLight, darkGrayLight } = useModeColor();
    const HEIGHT_TABLE = 50;
    const WIDTH_BOX_TABLE = 50;

    useEffect(() => {
        const today = new Date();
        getSlots({ id: sportComplexId, time: formatDate(today) });
    }, []);

    const handleAddSlot = (slot: SlotOrder) => {
        updateDataBooKing({ idSportComplex: sportComplexId, slot });
    };

    const isSlotInOrder = (slot: SlotOrder): boolean => {
        return dataBoking?.order?.some(
            (orderSlot) =>
                orderSlot.yard_id === slot.yard_id &&
                orderSlot.start_time === slot.start_time &&
                orderSlot.end_time === slot.end_time
        ) || false;
    };

    const renderFieldRows = () =>
        fields.map((field, fieldIndex) => (
            <View
                key={`field-${field.id}`}
                style={styles.rowContainer}
            >
                {field.slots.map((slot, slotIndex) => {
                    const isBooked = slot.is_booked;
                    const isExpired = isCheckTimeExpired(slot.start_time);
                    const isSlotOrder = isSlotInOrder({ ...slot, yard_id: field.id });

                    let backgroundColor = isBooked === 'empty' ? 'white' : isBooked === 'locked' ? '#AAAAAA' : '#FAE205';
                    if (isSlotOrder) backgroundColor = skyBlue;

                    if (isExpired) backgroundColor = '#AAAAAA';

                    return (
                        <Pressable
                            key={`slot-${field.id}-${slot.start_time}`}
                            style={[
                                styles.slotBox,
                                { backgroundColor, width: WIDTH_BOX_TABLE, height: HEIGHT_TABLE },
                            ]}
                            disabled={isBooked !== 'empty' || isExpired}
                            onPress={() => handleAddSlot({ ...slot, yard_id: field.id })}
                        />
                    );
                })}
            </View>
        ));

    // date
    const [date, setDate] = useState<Date>(new Date());
    const [tempDate, setTempDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'set' && selectedDate && Platform.OS === 'android') {
            setDate(selectedDate);
            setShow(false);
        }
        if (selectedDate) {
            setTempDate(selectedDate);
        }
    };

    const showDatePicker = () => {
        setTempDate(date);
        setShow(true);
    };

    const confirmDate = () => {
        setDate(tempDate);
        setShow(false);
    };

    const cancelDate = () => {
        setShow(false);
    };


    return (
        <LayoutComponent >
            <LoadingComponent loading={loading} />
            <HeaderComponent navigation={navigation} title="Đặt sân" />
            <View>
                <View
                    style={[styles.timeSelectContainer, { borderColor: skyBlue }]}
                >
                    <Text style={[styles.text, { color: skyBlue }]}>{date.toLocaleDateString()}</Text>
                    <TouchableOpacity
                        onPress={showDatePicker}
                    >
                        <CalendarIcon color={skyBlue} />
                    </TouchableOpacity>
                </View>

                {show && Platform.OS === 'ios' && (
                    <Modal
                        visible={show}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={cancelDate}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Chọn Ngày</Text>

                                <DateTimePicker
                                    value={tempDate}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                                    onChange={onChange}
                                    locale="vi-VN"
                                    textColor={skyBlue}
                                    minimumDate={new Date()}
                                />

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.button} onPress={cancelDate}>
                                        <Text style={styles.buttonText}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={confirmDate}>
                                        <Text style={styles.buttonText}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
                {
                    show && Platform.OS === 'android' && (
                        <DateTimePicker
                            value={tempDate}
                            mode="date"
                            display={'calendar'}
                            onChange={onChange}
                            minimumDate={new Date()}
                        />
                    )
                }
            </View>
            {!!fields?.length && !loading && (
                <View style={styles.mainContainer}>
                    <ScrollView horizontal>
                        <View style={styles.statusContainer}>
                            <BoxStatus label="Trống" color="white" />
                            <BoxStatus label="Khoá" color="#AAAAAA" />
                            <BoxStatus label="Đang đặt" color="#FAE205" />
                            <BoxStatus label="Đã đặt" color="#E72A2A" />
                        </View>
                    </ScrollView>

                    <View style={styles.tableContainer}>
                        <View style={[styles.leftColumn]}>
                            <View style={[styles.headerCell, { height: HEIGHT_TABLE, backgroundColor: skyBlue }]} />
                            {fields.map((_, index) => (
                                <View
                                    key={`field-label-${index}`}
                                    style={[styles.fieldLabelContainer, { height: HEIGHT_TABLE, }]}
                                >
                                    <Text style={styles.fieldLabel}>Sân {index + 1}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.rightColumn}>
                            <ScrollView
                                horizontal
                                style={{ paddingStart: 10 }}
                            >
                                <View>
                                    <View style={[styles.slotHeaderRow, { marginLeft: -WIDTH_BOX_TABLE / 2 }]}>
                                        {fields[0]?.slots.map((slot) => (
                                            <View
                                                key={`time-${slot.start_time}`}
                                                style={[styles.timeCell, { width: WIDTH_BOX_TABLE }]}
                                            >
                                                <Text style={styles.timeText}>{formatTimeTable(slot.start_time)}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {renderFieldRows()}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            )}
        </LayoutComponent>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        backgroundColor: COLORS.skyBlue
    },

    statusContainer: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
    },

    tableContainer: {
        width: '100%',
        flexDirection: 'row'
    },

    leftColumn: {
        width: '20%'
    },

    rightColumn: {
        width: '80%'
    },

    headerCell: {
        width: '100%',
        backgroundColor: '#46BEF1',
    },

    fieldLabelContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46BEF1',
    },

    fieldLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    timeCell: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46BEF1',
    },

    timeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },

    rowContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
    },

    slotHeaderRow: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#46BEF1',
    },

    slotBox: {
        borderWidth: 0.5,
        borderColor: COLORS.skyBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 
    text: {
        fontSize: SIZES.h5,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        color: COLORS.skyBlue,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: COLORS.skyBlue,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    timeSelectContainer: {
        borderWidth: 2,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginVertical: 20,
        width: '40%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginStart: 10
    }
});


export default DetailSlot;
