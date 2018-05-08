// @flow

import React from "react";
import { Animated } from "react-native";
import styled from "styled-components";

import constants from "../constants";
import animate from "../animate";
import Button from "./Button";
import Text from "./Text";

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${constants.spacing.s}px;
  background-color: rgba(0, 0, 0, 0);
`;

const Indicator = styled(Animated.View)`
  margin-top: ${constants.spacing.s};
  background-color: ${constants.colors.woltishBlue};
  height: 2;
  width: 80%;
`;

type Props = {
  active: boolean,
  onPress: () => void,
  label: string
};

export default class NavButton extends React.Component<
  Props,
  {
    animate: any
  }
> {
  state = {
    animate: new Animated.Value(0)
  };

  shouldComponentUpdate = (nextProps: Props) =>
    nextProps.active !== this.props.active;

  interPolateValue = (start: number, end: number): any =>
    this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [start, end]
    });

  viewTransforms = [
    { scaleX: this.interPolateValue(1, 1.1) },
    { scaleY: this.interPolateValue(1, 1.1) }
  ];

  render() {
    const { active, onPress, label } = this.props;

    if (active) {
      animate.toValue(this.state.animate, 1);
    } else {
      animate.toValue(this.state.animate, 0);
    }

    return (
      <Button onPress={onPress}>
        <Content>
          <Animated.View style={{ transform: this.viewTransforms }}>
            <Text center blue>
              {label}
            </Text>
          </Animated.View>
          {active && (
            <Indicator style={{ opacity: this.interPolateValue(0, 1) }} />
          )}
        </Content>
      </Button>
    );
  }
}
