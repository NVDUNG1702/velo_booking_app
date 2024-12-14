import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import ButtonComponent from '../../../../components/ButtonComponent';
import { BlurView } from '@react-native-community/blur';
import StarRating from '../../../../components/StarRating';
import { SportComplex } from '../../../../models/sportComplex';
import { SIZES } from '../../../../constans/size';
import { COLORS } from '../../../../constans/color';
import ArrowLeftIcon from '../../../../assets/IconComponents/ArrowLeftIcon';
import LocationIcon from '../../../../assets/IconComponents/LocationIcon';
import TimeIcon from '../../../../assets/IconComponents/TimeIcon';
import DirectionIcon from '../../../../assets/IconComponents/DirectionsIcon';
import PhoneIcon from '../../../../assets/IconComponents/PhoneIcon';
import { useModeColor } from '../../../../hooks/ColorMode/UseModeTheme';

interface SportDetailProps {
  data: SportComplex;
  handleCloseModel: () => void;
}

const SportDetail: React.FC<SportDetailProps> = ({ data, handleCloseModel }) => {

  const { skyBlue, textLight, isDarkMode } = useModeColor();

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <BlurView
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          blurAmount={6}
          blurType='light'
        />
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '100%', height: 100, borderColor: 'white', marginBottom: 10 }}
            resizeMode='cover'
            source={{ uri: 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          />
          <TouchableOpacity
            onPress={handleCloseModel}
            style={{ position: 'absolute', top: 10, left: 10 }}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
        </View>
        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Image
            style={{ width: 80, aspectRatio: '1/1', marginBottom: 10, borderRadius: '50%', marginTop: -40 }}
            resizeMode='cover'
            source={{ uri: 'https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          />
          <View style={{ width: '70%', alignItems: 'center' }}>
            <Text style={[styles.modalTitle]}>{data.name}</Text>
            {/* <Text style={styles.modalText}>Địa chỉ: {selectedMarker.location}</Text> */}
            {/* <Text style={styles.modalText}>Loại sân: {selectedMarker.marker}</Text> */}
            <Text style={styles.modalText}>Đánh giá: <StarRating rating={parseFloat(data.evaluation_sport)} /></Text>
          </View>
        </View>

        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={[
            {
              width: '25%',
              height: 30,
              backgroundColor: skyBlue,
              opacity: 0.8,
              borderRadius: 8,
              justifyContent: 'center'
            }
          ]}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                color: 'white',
              }}
            >Chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                width: '70%',
                height: 30,
                backgroundColor: skyBlue,
                opacity: 1,
                borderRadius: 8,
                justifyContent: 'center'
              }
            ]}
          >
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                color: 'white',
              }}
            >Đặt sân</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.details, { backgroundColor: isDarkMode ? '#2b2b2b' : COLORS.white }]}>
          <View style={styles.detailRow}>
            <LocationIcon color={skyBlue} />
            <Text style={[styles.detailText, { color: textLight }]}>{data.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <TimeIcon color={skyBlue} />
            <Text style={[styles.detailText, { color: textLight }]}>
              T2-CN: Sáng {data.opening_time} - Chiều {data.closing_time}
            </Text>
          </View>
          <TouchableOpacity style={styles.detailRow} >
            <DirectionIcon color={skyBlue} size={30} />
            <Text style={[styles.detailText, styles.linkText, { color: skyBlue }]}>
              Hướng dẫn đường đi
            </Text>
          </TouchableOpacity>
          <View style={styles.detailRow}>
            <PhoneIcon color={skyBlue} />
            <Text style={[styles.detailText, { color: textLight }]}>{data.phone[0]}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, { color: textLight }]}>
              Mô tả: {data.description || 'Không có mô tả nào!'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SportDetail;

const styles = StyleSheet.create({
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
    // paddingVertical: 10
  },
  modalTitle: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
    color: COLORS.white
  },
  modalText: {
    fontSize: SIZES.h5,
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

  details: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    minHeight: 150,
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
  linkText: {
    textDecorationLine: 'underline',
    color: '#007BFF',
  },
});