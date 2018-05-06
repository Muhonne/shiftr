// @flow

import React from "react";
import type { ChildrenArray, Node } from "react";

import { Animated } from "react-native";

const AnimatedView = (props: {
  width: number,
  transforms: Array<any>,
  children: ChildrenArray<Node>
}) => (
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
