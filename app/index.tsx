import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { getAccessToken, getRefreshToken, getUser, isLoggedIn, isTokenExpired } from '@/utils/secureStore'
import { Link, useRouter } from 'expo-router'
import { useAuthStore } from '@/store/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { MotiView, MotiText } from 'moti';

const index = () => {
    const router = useRouter()
    const { isLoading, loginUser, user, accessToken, setUser, setAccessToken, setRefreshToken, refreshToken } = useAuthStore()

    useEffect(() => {
        (async () => {
            try {
                const refreshToken = await getRefreshToken() || ""
                const isTokenValid = !isTokenExpired(refreshToken)
                console.log("isTokenValid: ", isTokenValid)

                if (!isTokenValid) {
                    console.log("Refresh token is expired")
                    router.push("/")
                    // replace push with replace to avoid going back to this page
                }
            } catch (error) {
                console.log("Error checking token: ", error)
                router.replace("/")
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const isUserLoggedIn = await isLoggedIn()

            console.log("isUserLoggedIn: ", isUserLoggedIn)
            if (isUserLoggedIn) {
                const user = await getUser()
                const refreshToken = await getRefreshToken() || ""
                const accessToken = await getAccessToken() || ""
                setUser(user)
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                router.replace("/(tabs)")
            } else {
                console.log("User is not logged in")
            }
        })()
    }, [])

    return (
        <>
            <StatusBar backgroundColor="#e3f2fd" style="dark" />
            <SafeAreaView className="flex-1 bg-[#e3f2fd] px-6 justify-center items-center">
                <MotiView
                    from={{ opacity: 0, translateY: 30 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 700 }}
                    className="w-full items-center"
                >
                    <Image
                        source={require('../assets/photos/bookimg.jpeg')}
                        style={{
                            width: 180,
                            height: 180,
                            borderRadius: 30,
                            marginBottom: 24,
                            borderWidth: 2,
                            borderColor: '#90caf9',
                        }}
                        contentFit="cover"
                    />

                    <Text className="text-textPrimary text-3xl font-bold text-center mb-2">
                        Welcome to <Text className="text-[#1976d2]">Suggest</Text> 📚
                    </Text>

                    <Text className="text-placeholderText text-lg text-center mb-6">
                        Discover and share the best books and course with your community. Start your learning journey now!
                    </Text>

                    <Link href="/(auth)" asChild>
                        <Pressable className="bg-[#1976d2] px-8 py-3 rounded-xl shadow-lg flex-row items-center active:opacity-90">
                            <Ionicons name="log-in-outline" size={22} color="#fff" />
                            <Text className="text-white text-lg font-semibold ml-2">Get Started</Text>
                        </Pressable>
                    </Link>

                    <MotiText
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 500, duration: 800 }}
                        className="text-placeholderText text-center mt-8 italic px-3"
                    >
                        "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
                        {"\n"}– Dr. Seuss
                    </MotiText>
                </MotiView>
            </SafeAreaView>
        </>
    )
}

export default index