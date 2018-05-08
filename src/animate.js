import {
  LayoutAnimation as NativeLayoutAnimation,
  Animated,
  Easing
} from "react-native";

export default {
  layout: () => NativeLayoutAnimation.easeInEaseOut(),
  toValue: (animatedValue: any, toValue: number): void => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }
};
