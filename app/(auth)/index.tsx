import { View, Text, Image, TextInput, KeyboardAvoidingView, Alert, Pressable, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter, } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { getAccessToken, getRefreshToken, getUser, isLoggedIn } from '@/utils/secureStore';
// import { loginUser } from '@/store/route';


const login = () => {

  // const [isLoading, setisLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, loginUser, user, accessToken, setUser, setAccessToken, setRefreshToken, refreshToken } = useAuthStore()

  const router = useRouter()

  // const handleLogin = async () => {
  //   setisLoading(true)
  //   if (!email || !password) {
  //     Alert.alert("Please fill in all fields")
  //     return
  //   }

  //   const response = await loginUser(email, password)
  //   console.log("Response: ", response.data)
  //   setUser(response.data.user)

  //   if (response.success) {
  //     Alert.alert("Login Successful", response.message)
  //   } else {
  //     Alert.alert("Login Failed", response.message)
  //   }
  //   setisLoading(false)

  //   // console.log("Access Token: ", accessToken)
  //   // console.log("Refresh Token: ", refreshToken)
  //   // console.log("User Data: ", response.user)
  //   // console.log("User2: ", user)
  // }

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser()
  //     const accessToken = await getAccessToken() || ""
  //     const refreshToken = await getRefreshToken() || ""
  //     setRefreshToken(refreshToken)
  //     setUser(user)
  //     setAccessToken(accessToken)
  //     console.log("User Data: ", user)
  //     // Alert.alert("User Data: ", user)
  //   })()
  // }, [])



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
        router.push("/(tabs)")
      }else {
        console.log("User is not logged in")
      }
    })()
  }, [])



  const handleLogin = async () => {
    const response = await loginUser(email, password)

    if (response.success) {
      Alert.alert("Login Successful", response.message)
      setEmail('')
      setPassword('')
    }
    else {
      Alert.alert("Login Failed", response.message)
      setEmail('')
      setPassword('')
    }
  }


  // console.log("user: ", user)
  console.log("accessToken: ", accessToken)
  // console.log("refreshToken: ", refreshToken )






  return (

    <KeyboardAvoidingView>
      <View className='bg-background h-full flex justify-center' >
        {/* <Text className="text-red-400 font-bold bg-primary">Hello Pradeep!</Text> */}
        <View className='h-[60vh]' >
          <Image
            source={require('../../assets/photos/bookImage1.png')}
            style={{ width: "auto", height: 200 }}
            resizeMode="cover"
          />

          <View className=' bg-cardBackground m-10 h-[40vh] shadow-lg p-5 rounded-2xl  ' >
            <View>
              <Text className="text-textDark font-bold text-lg mb-3">Email</Text>
              <View className="flex relative flex-row items-center border border-border bg-[#f0f8ff] p-1 rounded-lg mb-3">
                <MaterialCommunityIcons name="email-outline" size={18} color="#1a4971" />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor="#767676"
                  className="bg-[#f0f8ff] text-[#767676]  flex-1 p-2  rounded-lg"
                />
              </View>
            </View>
            <View>
              <Text className="text-textDark font-bold text-lg mb-3">Password</Text>
              <View className="flex relative flex-row items-center  border border-border bg-[#f0f8ff] p-1 rounded-lg mb-3">
                <MaterialCommunityIcons name="lock-outline" size={18} color="#1a4971" />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#767676"
                  className="bg-[#f0f8ff] text-[#767676]  p-2 flex-1 rounded-lg"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3"
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color="#1a4971"
                  />
                </Pressable>
              </View>
            </View>

            <Pressable onPress={handleLogin} className="bg-textSecondary p-3 rounded-lg mt-10 mb-3">
              {isLoading ? (
                <FontAwesome6 name="spinner" size={20} color="white" className="animate-spin text-center" />
              ) : (
                <Text className="text-white text-center font-bold">Login</Text>
                // <FontAwesome6 name="arrow-right" size={20} color="white" />
              )}
            </Pressable>
            <View className='flex flex-row gap-2 justify-center items-center'>
              <Text>Don't have a account ?</Text>
              <Link href="/(auth)/signup" className="text-textSecondary font-bold text-center">
                Signup
              </Link>

            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default login