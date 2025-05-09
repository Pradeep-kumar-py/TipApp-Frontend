import { View, Text, Image, TextInput, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';

const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, isLoading } = useAuthStore()


  const handleSignup = async () => {
    console.log(name, email, password)
    if (name === '' || email === '' || password === '') {
      alert('Please fill all the fields')
      return
    }
    const response = await registerUser(name, email, password)
    console.log("Response: ", response)
    if (response.success) {
      alert('User registered successfully')
      setEmail('')
      setName('')
      setPassword('')
    }
    else {
      {
        alert('User registration failed')
        setEmail('')
        setName('')
        setPassword('')
      }

    }
  }

  return (
    <KeyboardAvoidingView>
      <View className='bg-background h-full flex justify-center' >
        {/* <Text className="text-red-400 font-bold bg-primary">Hello Pradeep!</Text> */}

        <View className=' bg-cardBackground m-6 h-[63vh] shadow-lg p-5 rounded-2xl  ' >
          <View className='flex items-center justify-center mb-4' >
            <View className='flex flex-row justify-center items-center gap-2' >
              <Text className='text-textPrimary text-5xl' >Suggest</Text>
              <Image
                source={require('../../assets/photos/suggestion.png')}
                style={{ width: 50, height: 50 }}
                resizeMode="cover"
              />
            </View>
            <Text className='text-textSecondary text-lg' >Share your favorite reads </Text>
          </View>
          <View>
            <Text className="text-textDark font-bold text-lg mb-3">Full Name</Text>
            <View className="flex relative flex-row items-center border border-border bg-[#f0f8ff] p-1 rounded-lg mb-3">
              <FontAwesome6 name="user" size={16} color="#1a4971" />
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#767676"
                className="bg-[#f0f8ff] text-[#767676]  flex-1 p-2  rounded-lg"
              />
            </View>
          </View>
          <View>
            <Text className="text-textDark  font-bold text-lg mb-3">Email</Text>
            <View className="flex relative flex-row items-center border border-border bg-[#f0f8ff] p-1 rounded-lg mb-3">
              <MaterialCommunityIcons name="email-outline" size={18} color="#1a4971" />
              <TextInput
                placeholder="Email"
                value={email}
                keyboardType='email-address'
                onChangeText={setEmail}
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

          <Pressable onPress={handleSignup} className="bg-textSecondary p-3 rounded-lg mt-10 mb-3">
            {isLoading ? (
              <FontAwesome6 name="spinner" size={20} color="white" className="animate-spin text-center" />
            ) : (
              <Text className="text-white text-center font-bold">Signup</Text>
            )}
            {/* <Text className="text-white text-center font-bold">Signup</Text> */}
          </Pressable>
          <View className='flex flex-row gap-2 justify-center items-center'>
            <Text>Already have a account ?</Text>
            <Link href="/(auth)" className="text-textSecondary font-bold text-center">
              Login
            </Link>

          </View>

        </View>
      </View>
    </KeyboardAvoidingView>
  )


}
export default Signup