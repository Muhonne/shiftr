// @flow

import React from "react";
import type { ChildrenArray, Node } from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";

import styled from "styled-components";
import constants from "../constants";
import { Text } from "./index";

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${constants.spacing.m}px;
`;

const Button = (props: {
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
      background={TouchableNativeFeedback.Ripple("blue", false)}
    >
      {props.children}
    </TouchableNativeFeedback>
  );

const NavigationButton = (props: {
  text: string,
  toRoute: () => void,
  active: boolean
}) => {
  const { toRoute, text, active } = props;
  return (
    <Button onPress={toRoute}>
      <Content>
        <Text style={{ color: active ? "red" : "blue" }}>{text}</Text>
      </Content>
    </Button>
  );
};

export default NavigationButton;
