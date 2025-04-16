import { View, Text, Image, TextInput, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';



const login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  return (

    <SafeAreaView>
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
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#767676"
                  className="bg-[#f0f8ff] text-[#767676]  p-2 flex-1 rounded-lg"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3"
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color="#1a4971"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="bg-textSecondary p-3 rounded-lg mt-10 mb-3">
              <Text className="text-white text-center font-bold">Login</Text>
            </TouchableOpacity>
            <View className='flex flex-row gap-2 justify-center items-center'>
              <Text>Don't have a account ?</Text>
              <Link href="/(auth)/signup" className="text-textSecondary font-bold text-center">
                Signup
              </Link>

            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default login