import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userType } from './types';
import { jwtDecode } from 'jwt-decode';


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
    const token = await SecureStore.getItemAsync('accessToken');
    return token ?? undefined; // Return undefined if token is null
};

// This function retrieves the refresh token from secure storage
export const getRefreshToken = async (): Promise<string | undefined> => {
    const token = await SecureStore.getItemAsync('refreshToken');
    return token ?? undefined; // Return undefined if token is null
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
// export const saveUserData = async (userData: userType) => {
//     try {
//         await AsyncStorage.setItem('userData', JSON.stringify(userData));
//     } catch (error) {
//         console.error('Error saving user data:', error);
//     }
// };


// This function retrieves user data from async storage
// export const getUserData = async () => {
//     try {
//         const userData = await AsyncStorage.getItem('userData');
//         return userData ? JSON.parse(userData) : null;
//     } catch (error) {
//         console.error('Error retrieving user data:', error);
//         return null;
//     }
// };


// This function clears user data from async storage
export const clearUserData = async () => {
    try {
        await AsyncStorage.removeItem('userData');
    } catch (error) {
        console.error('Error clearing user data:', error);
    }
};


// This function save user data to async storage
export const saveUser = async (user: userType) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
}


// This function retrieves user data from async storage
export const getUser = async ():Promise<userType | null> => {
    try {
        const user = await AsyncStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
}




// This function clears user data from async storage
export const clearUser = async () => {
    try {
        await AsyncStorage.removeItem('user');
    } catch (error) {
        console.error('Error clearing user data:', error);
    }
}
// This function checks if the user is logged in by checking the access token and refresh token
export const isLoggedIn = async ():  Promise<boolean> => {
    // const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    const user = await getUser();
    return !!refreshToken&& !!user;
};


// is token expired or not
export const isTokenExpired = (token: string):boolean =>{
    try {
      const { exp } = jwtDecode(token);
      // exp is in seconds since epoch
      return Date.now() >= (exp ?? 0) * 1000; // Check if current time is greater than expiration time
    } catch {
      // Invalid token format → treat as expired
      return true;
    }
  }

