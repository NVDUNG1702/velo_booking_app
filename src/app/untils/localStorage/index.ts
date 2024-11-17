import AsyncStorage from '@react-native-async-storage/async-storage';

export const setDataStorage = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        // log check
        console.log("error set item local storage: ", error);
    }
}

export const getDataStorage = async (key: string) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (error) {
        // log check
        console.log("error get item local storage: ", error);
    }
}

export const removeDataStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        // log check
        console.log("error remove item local storage: ", error);
    }
}