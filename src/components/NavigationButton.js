// @flow

import React from "react";
import type { ChildrenArray, Node } from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from "react-native";
import LottieView from "lottie-react-native";

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

class NavigationButton extends React.Component<
  {
    text: string,
    toRoute: () => void,
    active: boolean
  },
  {
    active: boolean,
    progess: any
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  /**
   * myshifts open 0.333 -> 0.666
   */

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 0.1,
      duration: 5000,
      easing: Easing.linear
    }).start();
  }

  render() {
    const { toRoute, text, active } = this.props;
    return (
      <Button onPress={toRoute}>
        <Content>
          {/* <Text style={{ color: active ? "red" : "blue" }}>{text}</Text> */}
          <LottieView
            source={require("../lottie/work.json")}
            progress={this.state.progress}
          />
        </Content>
      </Button>
    );
  }
}

export default NavigationButton;
