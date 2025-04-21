import { saveAccessToken, saveRefreshToken } from '../utils/secureStore';
import { create } from 'zustand';


interface AuthState {
    user: any;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    registerUser: (name: string, email: string, password: string) => Promise<any>;
    loginUser: (email: string, password: string) => Promise<any>;
    logoutUser: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    // setAccessToken: (token: String) => set({ accessToken: token }),
    // setRefreshToken: (token: String) => set({ refreshToken: token }),
    // clearTokens: () => set({ accessToken: null, refreshToken: null }),

    registerUser: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch('https://tipapp.azurewebsites.net/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            // Check if the response is ok (status code 200-299)
            if(!response.ok) {
                throw new Error(data.message);
            }

            // Save the access token and refresh token to secure storage
            await saveAccessToken(data.accessToken);
            await saveRefreshToken(data.refreshToken);


            // Update the store with user data and tokens
            set({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken, isLoading: false });

            
            return {success: true, message: 'User registered successfully'};

        } catch (error) {
            console.error('Error registering user:', error);
            set({ isLoading: false });
            return {success: false, message: 'Error registering user'};
        }
    },

    loginUser: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch('https://tipapp.azurewebsites.net/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            // Check if the response is ok (status code 200-299)
            if(!response.ok) {
                throw new Error(data.message);
            }

            // Save the access token and refresh token to secure storage
            await saveAccessToken(data.accessToken);
            await saveRefreshToken(data.refreshToken);


            // Update the store with user data and tokens
            set({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken, isLoading: true });

            
            return {success: true, message: 'User logged in successfully'};

        } catch (error) {
            console.error('Error logging in user:', error);
            set({ isLoading: false });
            return {success: false, message: 'Error logging in user'};
        }
    },
    logoutUser: async () => {
        set({ isLoading: false, user: null, accessToken: null, refreshToken: null });
        // Clear the access token and refresh token from secure storage
        await saveAccessToken(null);
        await saveRefreshToken(null);
    }


}));


// Todo to implement the auth store
// what state do we need to store ?
// 1. accessToken: string | null;
// 2. refreshToken: string | null;
