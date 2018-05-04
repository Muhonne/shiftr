// @flow
/* eslint-disable import/prefer-default-export */
import React from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import type { ChildrenArray, Node } from "react";

import styled from "styled-components";
import constants from "../constants";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: ${props =>
    props.large ? constants.fontSize.large : constants.fontSize.normal};
`;

export const Button = (props: {
  children: ChildrenArray<Node>,
  onPress: () => void
}) =>
  Platform.OS === "ios" ? (
    <TouchableWithoutFeedback onPress={props.onPress}>
      {props.children}
    </TouchableWithoutFeedback>
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
