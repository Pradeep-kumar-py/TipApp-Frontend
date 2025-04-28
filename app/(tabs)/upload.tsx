import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image'
import { useAuthStore } from '@/store/authStore';
import { clearSecureStore } from '@/utils/secureStore';

const Upload = () => {

  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [rating, setRating] = useState(0)
  const [link, setLink] = useState('')
  const [imageFile, setImageFile] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const { uploadBook, isLoading } = useAuthStore()


  const pickImageAsync = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!image.canceled) {
      console.log(image);

      const asset = image.assets[0];
      setImageFile({
        uri: asset.uri,
        type: asset.mimeType ?? 'image/jpeg',
        name: asset.fileName ?? 'photo.jpg',
      })

      setSelectedImage(image.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const handleSubmit = async () => {
    if (!title || !caption || !rating ) {
      alert("Please fill in all fields")
      return
    }

    const formData = new FormData();

    // Append the image file if available
    if (imageFile) {
      formData.append('image', imageFile as any);
    }

    // Append other form data
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('rating', rating.toString());
    formData.append('link', link);

    console.log("Form Data: ",
      formData.get('file'),
      formData.get('title'),
      formData.get('caption'),
      formData.get('rating'),
      formData.get('link')
    );

    try {
      const result = await uploadBook(formData);
      console.log("Upload Result: ", result);
      if (result.success) {
        alert("Book uploaded successfully!");
        // Reset form or navigate away
        setTitle('');
        setCaption('');
        setRating(0);
        setLink('');
        setImageFile(null);
        setSelectedImage(undefined);
      } else {
        console.error("Upload failed123: ", result.message);
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while uploading the book");
      console.error(error);
    }

  };

  // const logoutUser = async () => {
  //   await clearSecureStore();
  //   // Clear user data from the store
  //   alert("User logged out successfully")
  // }

  const uploadProfileImage = async () => {
    if (!imageFile) {
      alert("Please select an image first")
      return
    }

    const formData = new FormData();
    formData.append('file', imageFile as any);

    try {
      const result = await uploadBook(formData);
      console.log("Upload Result: ", result);
      if (result.success) {
        alert("Profile image uploaded successfully!");
        // Reset form or navigate away
        setImageFile(null);
        setSelectedImage(undefined);
      } else {
        console.error("Upload failed123: ", result.message);
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while uploading the profile image");
      console.error(error);
    }
  }
    




  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView className="flex-1 "
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80} // adjust if you have headers
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          keyboardShouldPersistTaps="handled"
        >
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
                  <TextInput
                    className="text-textSecondary flex-1 rounded-lg p-2 "
                    placeholder='Enter book title'
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor="#767676"
                  />
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
                <Pressable onPress={pickImageAsync} className="flex items-center justify-center border-[1px] border-border rounded-lg p-2 h-60 ">
                  {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={{ height: '100%', width: '100%' }} className="rounded-lg h-full w-full" contentFit="cover" alt="Selected Image" />
                  ) : (
                    <View className="flex items-center justify-center h-full" >
                      <Ionicons name="image-outline" size={50} color="#1976D2" />
                      <Text className="text-textSecondary text-sm">Tap to select an image</Text>
                    </View>
                  )}
                </Pressable>
              </View>
              <View className="w-full mb-4">
                <Text className="text-textPrimary font-semibold mb-1">Book Description</Text>
                <View className="border-[1px] border-border rounded-lg  ">
                  <TextInput
                    className="text-textSecondary  flex-1 rounded-lg p-2 min-h-36 "
                    placeholder='Write your review or thoughts about the book or course... '
                    value={caption}
                    onChangeText={setCaption}
                    placeholderTextColor="#767676"
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
                    value={link}
                    onChangeText={setLink}
                    placeholderTextColor="#767676"
                    multiline={true}
                    numberOfLines={2}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>
            <Pressable onPress={handleSubmit} className="bg-primary p-2 rounded-lg mt-5">
              {isLoading ? ( 
               <FontAwesome6 name="spinner" size={20} color="white" className="animate-spin ml-3 text-center" /> 
              ) : (
                <Text className="text-white text-center">Add book or course</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Upload