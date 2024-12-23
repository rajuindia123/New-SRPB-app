import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions,TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { styles } from '../../styles/components/autoImageSlider';
const { width } = Dimensions.get('window');




const AutoImageSlider = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useSharedValue(0);

  // Auto scroll to the next image
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Synchronize the dot indicators with the scroll position
  const onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    scrollX.value = scrollPosition / width;
  };

  return (
    <View style={styles.container}>
      {/* Image Slider */}
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item }) => (
            <View >
                <TouchableOpacity style={{height:'100%'}} onPress={()=>console.log("Click",item)}>
                <Image source={{ uri: item }} style={styles.image} />
                </TouchableOpacity>
                 
            </View>
         
        )}
      />

      {/* Dot Indicators */}
      <View style={styles.dotContainer}>
        {images.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const opacity = withTiming(index === activeIndex ? 1 : 0.3);
            const scale = withTiming(index === activeIndex ? 1.2 : 1);
            return { opacity, transform: [{ scale }] };
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, animatedStyle]}
            />
          );
        })}
      </View>
    </View>
  );
};


export default AutoImageSlider;