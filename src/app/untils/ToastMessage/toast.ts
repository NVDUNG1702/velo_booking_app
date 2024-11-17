import Toast from 'react-native-toast-message';

Toast.show({

})

export const ToastSuccess = (title: string, message: string) => {
    Toast.show({
        type: 'success',
        text1: title || '',
        text2: message || '',
        topOffset: 55,
        visibilityTime: 2000
    })
}

export const ToastError = (title: string, message: string) => {
    Toast.show({
        type: 'error',
        text1: title || '',
        text2: message || '',
        topOffset: 55,
        visibilityTime: 2000
    })
}