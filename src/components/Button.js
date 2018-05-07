// @flow

import React from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import type { ChildrenArray, Node } from "react";

import constants from "../constants";

const Button = (props: {
  children: ChildrenArray<Node>,
  onPress: () => void,
  style?: any
}) =>
  Platform.OS === "ios" ? (
    <TouchableWithoutFeedback onPress={props.onPress} style={props.style}>
      {props.children}
    </TouchableWithoutFeedback>
  ) : (
    <TouchableNativeFeedback
      style={props.style}
      onPress={props.onPress}
      background={TouchableNativeFeedback.Ripple(
        constants.colors.greenBg,
        false
      )}
    >
      {props.children}
    </TouchableNativeFeedback>
  );

Button.defaultProps = {
  style: {}
};

export default Button;
