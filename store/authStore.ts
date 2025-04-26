import { userType } from '@/utils/types';
import { clearSecureStore, saveAccessToken, saveRefreshToken, saveUser } from '../utils/secureStore';
import { create } from 'zustand';


interface AuthState {
    user: userType | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    isLoading: boolean;
    setisLoading: (isLoading: boolean) => void;
    setUser: (user: any) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    clearTokens: () => void;
    checkmethod: () => void;
    loginUser: (email: string, password: string) => Promise<{ success: boolean; message: string; data?: any }>;
    registerUser: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string; data?: any }>;

}


export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    setisLoading: (isLoading: boolean) => set({ isLoading }),
    setUser: (user: any) => set({ user }),
    setAccessToken: (accessToken: string) => set({ accessToken }),
    setRefreshToken: (refreshToken: string) => set({ refreshToken }),
    clearTokens: () => set({ accessToken: null, refreshToken: null }),

    checkmethod: () => {
        set({ isLoading: true });
        setTimeout(() => {
            // clearTokens();
        }, 4000);
        console.log("Check method called")
    },

    loginUser: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch('https://tipapp.azurewebsites.net/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase(), password }),
            });
            const data = await response.json();

            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
                throw new Error(data.message);
            }
            console.log("Data11111: ", data)
            // Save the access token and refresh token to secure storage
            await saveAccessToken(data.accessToken);
            await saveRefreshToken(data.refreshToken);
            await saveUser(data.user);

            // Update the store with user data and tokens
            set({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken, isLoading: false });


            return { success: true, message: 'User logged in successfully', data };

        } catch (error) {
            console.error('Error logging in user:', error);
            set({ isLoading: false });
            return { success: false, message: 'Error logging in user' };
        }
    },


    registerUser: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch('https://tipapp.azurewebsites.net/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email: email.toLowerCase(), password }),
            });
            const data = await response.json();

            console.log("Data: ", data)
            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
                throw new Error(data.message);
            }

            // Save the access token and refresh token to secure storage
            await saveAccessToken(data.accessToken);
            await saveRefreshToken(data.refreshToken);
            await saveUser(data.user);



            // Update the store with user data and tokens
            set({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken, isLoading: false });


            return { success: true, message: 'User registered successfully', data };

        } catch (error) {
            set({ isLoading: false });
            console.error('Error registering user:', error);
            return { success: false, message: 'Error registering user', };
        }
    },

    logoutUser: async () => {
        set({ isLoading: false, user: null, accessToken: null, refreshToken: null });
        // Clear the access token and refresh token from secure storage
        await clearSecureStore();
        console.log("User logged out successfully")
    }

}));


// Todo to implement the auth store
// what state do we need to store ?
// 1. accessToken: string | null;
// 2. refreshToken: string | null;
