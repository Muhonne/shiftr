import React from "react";
import { Animated } from "react-native";

const AnimatedView = props => (
  <Animated.View
    style={{
      width: `${props.width}%`,
      transform: props.transforms
    }}
  >
    {props.children}
  </Animated.View>
);

export default AnimatedView;
