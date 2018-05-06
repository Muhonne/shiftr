// @flow

import React from "react";
import styled from "styled-components";
import {
  Animated,
  Easing,
  LayoutAnimation,
  TouchableWithoutFeedback
} from "react-native";

import Text from "./Text";
import Button from "./Button";
import type { Shift } from "../types";
import constants from "../constants";
import utils from "../utils";
import AnimatedView from "./AnimatedView";
import BookShift from "./BookShift";

const Container = styled.View`
  padding: ${constants.spacing.s}px;
  margin-top: ${constants.spacing.s / 2}px;
  margin-bottom: ${constants.spacing.s / 2}px;
  margin-left: ${constants.spacing.s}px;
  margin-right: ${constants.spacing.s}px;
  border: 1px;
  border-color: ${constants.colors.grey};
  border-radius: ${constants.spacing.s};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ContentRow = styled(Row)`
  margin-bottom: ${props => (props.open ? constants.spacing.s : 0)};
`;

const OpenContent = styled.View`
  flex: 0.5;
  margin: ${constants.spacing.s}px;
`;

const Icon = styled.Image`
  width: ${constants.fontSize.normal};
  height: ${constants.fontSize.normal};
  margin-right: ${constants.spacing.s};
`;

class ShiftListItem extends React.Component<
  { shift: Shift },
  { open: boolean, animate: any }
> {
  state = {
    open: false,
    animate: new Animated.Value(0)
  };

  toggle = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ open: !this.state.open });
    if (this.state.open) {
      this.animate(0);
    } else {
      this.animate(1);
    }
  };

  animate = (toValue: number): void => {
    Animated.timing(this.state.animate, {
      toValue,
      duration: constants.animationDuration,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  interPolateValue = (start: number, end: number): any =>
    this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [start, end]
    });

  viewTransforms = [
    { scaleX: this.interPolateValue(1, 1.1) },
    { scaleY: this.interPolateValue(1, 1.1) },
    { translateX: this.interPolateValue(0, 10) }
  ];

  render() {
    const { shift } = this.props;
    const { open } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.toggle}>
        <Container>
          <Row open={this.state.open}>
            <AnimatedView width={45} transforms={this.viewTransforms}>
              <ContentRow open={this.state.open}>
                <Icon source={require("../img/place.png")} />
                <Text>{shift.area}</Text>
              </ContentRow>
            </AnimatedView>
            <AnimatedView width={55} transforms={this.viewTransforms}>
              <ContentRow open={this.state.open}>
                <Icon source={require("../img/time.png")} />
                <Text>
                  {`${utils.formatDate(shift.startTime)}`}
                  {open && ` -  ${utils.formatDate(shift.endTime)}`}
                </Text>
              </ContentRow>
            </AnimatedView>
          </Row>
          {open && (
            <Row>
              <OpenContent>
                <Text>Shift duration</Text>
                <Text large>
                  {utils.getDuration(shift.startTime, shift.endTime)}
                </Text>
              </OpenContent>
              <OpenContent>
                <BookShift shiftId={shift.id} />
              </OpenContent>
            </Row>
          )}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
export default ShiftListItem;
