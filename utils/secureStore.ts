import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userType } from './types';


// This function saves the access token to secure storage
export const saveAccessToken = async (accessToken: string | null) => {
    if (accessToken === null) return;
    await SecureStore.setItemAsync('accessToken', accessToken);
};

// This function saves the refresh token to secure storage
export const saveRefreshToken = async (refreshToken: string | null) => {
    if (refreshToken === null) return;
    await SecureStore.setItemAsync('refreshToken', refreshToken);
};

// This function retrieves the access token from secure storage
export const getAccessToken = async () => {
    return await SecureStore.getItemAsync('accessToken');
};

// This function retrieves the refresh token from secure storage
export const getRefreshToken = async () => {
    return await SecureStore.getItemAsync('refreshToken');
};


// This function checks if the access token exists in secure storage
export const removeAccessToken = async () => {
    await SecureStore.deleteItemAsync('accessToken');
};

// This function checks if the refresh token exists in secure storage
export const removeRefreshToken = async () => {
    await SecureStore.deleteItemAsync('refreshToken');
};

// This function clears both the access and refresh tokens from secure storage
export const clearSecureStore = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
}

//This function saves user data in async storage
export const saveUserData = async (userData: userType) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};
// This function retrieves user data from async storage
export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};
// This function clears user data from async storage
export const clearUserData = async () => {
    try {
        await AsyncStorage.removeItem('userData');
    } catch (error) {
        console.error('Error clearing user data:', error);
    }
};


