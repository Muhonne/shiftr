// @flow

import React from "react";
import { Animated, Easing, Platform } from "react-native";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import { navigationActions } from "../redux/navigation";
import constants from "../constants";
import { Button } from "./index";
import utils from "../utils";

/**
 * There are only two animations for the two routes
 * myShifts: starts from 0.333 and ends at 0.666
 * availableShifts: starts from 0.12 and ends at 0.22
 */
const animationPoints = {
  start: Platform.OS === "ios" ? 0.333 : 0.3,
  end: Platform.OS === "ios" ? 0.666 : 0.7
};

// you'd think a child element would respect it's parents paddings
// lottie says eat shit
const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${constants.spacing.m}px;
  padding-bottom: ${utils.isIphoneX()
    ? constants.spacing.m + 10
    : constants.spacing.m}px;
  background-color: ${props =>
    props.active ? constants.colors.greenBg : "#fff"};
`;

class NavButton extends React.Component<
  {
    toRoute: string,
    currentRoute: string,
    toMyShifts: () => void,
    toAvailableShifts: () => void
  },
  {
    progress: any,
    endValue: number
  }
> {
  static getDerivedStateFromProps(nextProps, prevState) {
    /**
     *  there are three states in which this exists
     * 1. first render when only active matters
     *      this is handled internally with currentRoute from redux
     * 2. going to route when need to animate forwards
     *      this we need to catch when currentRoute changes to components route
     * 3. leaving route when need to animate backwards
     *      this we need to catch when currentoure changes away from components route
     * */
    // TODO: is this really the way to do it?
    if (prevState.currentRoute === "") {
      return { currentRoute: nextProps.currentRoute };
    }
    if (prevState.currentRoute !== nextProps.currentRoute) {
      if (nextProps.currentRoute === nextProps.toRoute) {
        console.log(
          "route has changed and we are coming to my route so animate"
        );
        return {
          progress: new Animated.Value(animationPoints.start),
          endValue: animationPoints.end,
          currentRoute: nextProps.currentroute
        };
      }

      return {
        progress: new Animated.Value(animationPoints.end),
        endValue: animationPoints.start,
        currentRoute: nextProps.currentroute
      };
    }

    // initial state
    return { progress: false, currentRoute: nextProps.currentRoute };
  }

  state = { currentRoute: "" };

  buttonPress = () => {
    if (this.props.toRoute === constants.routes.MY_SHIFTS) {
      this.props.toMyShifts();
    } else {
      this.props.toAvailableShifts();
    }
  };

  render() {
    console.log("render button", this.state);
    if (this.state.progress) {
      Animated.timing(this.state.progress, {
        toValue: this.state.endValue,
        duration: constants.animationDuration,
        easing: Easing.linear
      }).start();
    }

    return (
      <Button onPress={this.buttonPress}>
        <Content active={this.props.currentRoute === this.props.toRoute}>
          <LottieView
            source={
              this.props.toRoute === constants.routes.MY_SHIFTS
                ? require("../lottie/myshifts.json")
                : require("../lottie/work.json")
            }
            progress={this.state.progress || animationPoints.start}
          />
        </Content>
      </Button>
    );
  }
}

export default connect(
  ({ navigation }) => ({ currentRoute: navigation.route }),
  dispatch => ({
    toMyShifts: () => dispatch(navigationActions.toMyShifts()),
    toAvailableShifts: () => dispatch(navigationActions.toAvailableShifts())
  })
)(NavButton);
