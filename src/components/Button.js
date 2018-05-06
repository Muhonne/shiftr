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
  onPress: () => void
}) =>
  Platform.OS === "ios" ? (
    <TouchableWithoutFeedback>{props.children}</TouchableWithoutFeedback>
  ) : (
    <TouchableNativeFeedback
      onPress={props.onPress}
      background={TouchableNativeFeedback.Ripple(
        constants.colors.lightGreen,
        false
      )}
    >
      {props.children}
    </TouchableNativeFeedback>
  );

export default Button;
