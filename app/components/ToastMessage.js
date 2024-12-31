import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds

const ToastMessage = ({ message, visible, type = "success", onHide }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current; // For slide animations
  const rotate = useRef(new Animated.Value(0)).current; // For close button animation

  useEffect(() => {
    if (visible) {
      // Show animations
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    // Close button rotate animation
    Animated.timing(rotate, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Reset rotate and hide toast
      rotate.setValue(0);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(onHide);
    });
  };

  if (!visible) return null;

  const getGradientColors = () => {
    switch (type) {
      case "success":
        return ["#4CAF50", "#81C784"]; // Green gradient
      case "error":
        return ["#FFC107", "#FFD54F"]; // Red gradient
      case "warning":
        return ["#FFC107", "#FFD54F"]; // Yellow gradient
      default:
        return ["#333", "#666"]; // Default gradient
    }
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <LinearGradient
        colors={getGradientColors()}
        style={styles.gradientBackground}
      >
        <Text style={styles.text}>{message}</Text>
        <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <AntDesign name="close" size={20} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 50,
    left: '5%',
    right: '5%',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 10,
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  closeButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default ToastMessage;
