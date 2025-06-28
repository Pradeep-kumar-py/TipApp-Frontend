import React, { useState } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;


type BookType = {
    image: string;
};

function isVideo(url: string) {
    // Simple check for common video extensions
    return /\.(mp4|mov|webm|ogg)$/i.test(url);
}

export const BookCardImage = ({ item }: { item: BookType }) => {
    const [AspectRatio, setAspectRatio] = useState<number>(.75); // Default aspect ratio, can be adjusted based on your needs

    const handleImageLoad = (event: { source: { width: number; height: number } }) => {
        const { width, height } = event.source;
        if (width && height) {
            setAspectRatio(width / height); // or height / width if you prefer
        }
    };

    return (
        <View style={{ margin: 4 }}>
            <Image
                source={{ uri: item.image }}
                style={{
                    width: '100%',
                    // height: imageHeight,
                    aspectRatio: AspectRatio,
                    borderRadius: 10,


                }}
                contentFit="contain"
                onLoad={handleImageLoad}
            />
        </View>
    );
};
