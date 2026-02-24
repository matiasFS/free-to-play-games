import { useRef } from "react";
import { Animated } from "react-native";

export function useFadeHeader(imageHeight) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, imageHeight],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return { scrollY, imageOpacity };
}