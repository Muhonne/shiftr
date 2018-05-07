// @flow

import React from "react";
import styled from "styled-components";
import {
  Animated,
  Easing,
  LayoutAnimation,
  TouchableWithoutFeedback
} from "react-native";
import { reduxAutoloader } from "redux-autoloader";

import apiCalls from "../apiCalls";
import Text from "./Text";
import type { Shift } from "../types";
import constants from "../constants";
import utils from "../utils";
import ShiftButton from "./ShiftButton";

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

type Props = {
  shift: Shift,
  data?: Shift,
  refresh: () => void
};

class ShiftListItem extends React.Component<
  Props,
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
    // translateX is pretty much random that works
    { translateX: this.interPolateValue(0, 10) }
  ];

  render() {
    // initial data from parent, override with data from shifts own endpoint
    const { id, area, startTime, endTime, booked } =
      this.props.data || this.props.shift;
    const { refresh } = this.props;
    const { open } = this.state;

    LayoutAnimation.easeInEaseOut();

    return (
      <TouchableWithoutFeedback onPress={this.toggle}>
        <Container>
          <Row open={this.state.open}>
            <Animated.View
              style={{ width: "45%", transform: this.viewTransforms }}
            >
              <ContentRow open={this.state.open}>
                <Icon source={require("../img/place.png")} />
                <Text>{area}</Text>
              </ContentRow>
            </Animated.View>
            <Animated.View
              style={{ width: "55%", transform: this.viewTransforms }}
            >
              <ContentRow open={this.state.open}>
                <Icon source={require("../img/time.png")} />
                <Text>
                  {`${utils.formatDate(startTime)}`}
                  {open && ` -  ${utils.formatDate(endTime)}`}
                </Text>
              </ContentRow>
            </Animated.View>
          </Row>
          {open && (
            <Row>
              <OpenContent>
                <Text>Shift duration</Text>
                <Text large>{utils.getDuration(startTime, endTime)}</Text>
              </OpenContent>
              <OpenContent>
                {/*
                 ShiftButton has a funky key because we want to trigger the animation for
                 the whole view, not just the label text because animating text sucks
                 */}
                <ShiftButton
                  key={`${id}${booked.toString()}`}
                  shiftId={id}
                  refreshParent={refresh}
                  parentBooked={booked}
                  label={booked ? "Cancel" : "Book"}
                />
              </OpenContent>
            </Row>
          )}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
export default reduxAutoloader({
  startOnMount: false,
  name: (props: Props) => props.shift.id,
  apiCall: (props: Props) => apiCalls.getShift(props.shift.id)
})(ShiftListItem);
