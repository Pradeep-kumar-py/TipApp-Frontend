export interface userType {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    profileImage: string,
}

export interface AuthState {
    user: any;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    registerUser: (name: string, email: string, password: string) => Promise<any>;
    loginUser: (email: string, password: string) => Promise<any>;
    logoutUser: () => Promise<void>;
}