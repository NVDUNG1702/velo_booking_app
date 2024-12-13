import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

Toast.show({

})

export const ToastSuccess = (title: string, message: string, time?: number, callBack?: () => void) => {
    Toast.show({
        type: 'success',
        text1: title || '',
        text2: message || '',
        topOffset: Platform.OS === 'android' ? 0 : 55,
        visibilityTime: time || 2000,
        onHide: () => {
            if (callBack) {
                callBack();
            }
        }
    })
}

export const ToastError = (title: string, message: string, callBack?: () => {}) => {
    Toast.show({
        type: 'error',
        text1: title || '',
        text2: message || '',
        topOffset: 55,
        visibilityTime: 2000,
        onHide: () => {
            if (callBack) {
                callBack();
            }
        }
    })
}