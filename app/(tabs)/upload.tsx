import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Upload = () => {

  const [rating, setRating] = useState(null)
  const [image, setImage] = useState<string | null>(null)

  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ['images'],
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     console.log(result);
  //   } else {
  //     alert('You did not select any image.');
  //   }
  // };


  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        <View className="border-[1px] border-border p-5 mx-5 my-safe-or-7  rounded-lg bg-cardBackground drop-shadow-lg " >
          <View className="flex justify-center items-center mb-5" >
            <Text className="font-bold text-textPrimary text-xl " >Add Book || Course Recommendation</Text>
            <Text className='text-textSecondary text-sm' >Share your favourite reads with others</Text>
          </View>
          <View className='flex items-center' >
            <View className="w-full my-4 " >
              <Text className="text-textPrimary font-semibold mb-1 ">Book or Course Title</Text>
              <View className="flex-row items-center border-[1px] border-border rounded-lg p-1 pl-2 " >
                <Ionicons name="book-outline" size={20} color="#1976D2" />
                <TextInput className="text-textSecondary flex-1 rounded-lg p-2 " placeholder='Enter book title' />
              </View>
            </View>
            <View className="w-full mb-4 " >
              <Text className='text-textPrimary font-semibold mb-1 ' >Your Rating</Text>
              <View className="flex-row  items-center justify-evenly border-[1px] border-border rounded-lg p-2 " >
                {[1, 2, 3, 4, 5].map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => setRating(item)}
                    className="flex-row items-center justify-center"
                  >
                    <Ionicons
                      name={rating >= item ? "star-sharp" : "star-outline"}
                      size={36}
                      color={rating >= item ? "#FFD700" : "#6d93b8"} // yellow or blue
                    />
                  </Pressable >
                ))}
              </View>
            </View>
            <View className="w-full mb-4 ">
              <Text className="text-textPrimary font-semibold mb-1">Book or Course Image</Text>
              <View className="flex items-center justify-center border-[1px] border-border rounded-lg p-2 h-60 ">
                <Ionicons name="image-outline" size={50} color="#1976D2" />
              </View>
            </View>
            <View className="w-full mb-4">
              <Text className="text-textPrimary font-semibold mb-1">Book Description</Text>
              <View className="border-[1px] border-border rounded-lg  ">
                <TextInput
                  className="text-textSecondary  flex-1 rounded-lg p-2 min-h-36 "
                  placeholder='Write your review or thoughts about the book or course... '
                  multiline={true}
                  numberOfLines={8}
                  textAlignVertical="top"
                />
              </View>
            </View>
            <View className="w-full mb-4">
              <Text className="text-textPrimary font-semibold mb-1">Link</Text>
              <View className='flex-row items-center border-[1px] border-border rounded-lg p-2 ' >
                <Ionicons name="link-outline" size={20} color="#1976D2" />
                <TextInput
                  className="text-textSecondary  flex-1 rounded-lg p-2 "
                  placeholder='Enter book or course link'
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>
          <Pressable className="bg-primary p-2 rounded-lg mt-5">
            <Text className="text-white text-center">Upload</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Upload