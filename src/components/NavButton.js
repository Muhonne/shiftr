// @flow

import React from "react";
import { Animated, Easing, View } from "react-native";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import { navigationActions } from "../redux/navigation";
import constants from "../constants";
import Button from "./Button";
import Text from "./Text";
import utils from "../utils";

const myShiftsAnimation = require("../lottie/myshifts.json");
const availableShiftsAnimation = require("../lottie/work.json");

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${constants.spacing.m}px;
  background-color: rgba(0, 0, 0, 0);
`;

const StupidIphoneSpacer = styled.View`
  height: 15;
  background-color: rgba(0, 0, 0, 0);
`;

const ButtonText = styled(Text)`
  font-size: ${constants.fontSize.small};
`;

class NavButton extends React.Component<
  {
    toRoute: string,
    currentRoute: string,
    toMyShifts: () => void,
    toAvailableShifts: () => void
  },
  {
    progress: any
  }
> {
  state = {
    progress: new Animated.Value(0.333)
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.currentRoute !== nextProps.currentRoute) return true;
    return false;
  }

  buttonPress = () => {
    if (this.props.toRoute === constants.routes.MY_SHIFTS) {
      this.props.toMyShifts();
    } else {
      this.props.toAvailableShifts();
    }
  };

  render() {
    if (this.props.currentRoute !== this.props.toRoute) {
      Animated.timing(this.state.progress, {
        toValue: 0.333,
        duration: constants.animationDuration,
        easing: Easing.linear
      }).start();
    } else {
      Animated.timing(this.state.progress, {
        toValue: 0.666,
        duration: constants.animationDuration,
        easing: Easing.linear
      }).start();
    }

    return (
      <Button onPress={this.buttonPress}>
        <View
          style={{
            flex: 1,
            backgroundColor:
              this.props.currentRoute === this.props.toRoute
                ? constants.colors.greenBg
                : "white"
          }}
        >
          <Content>
            <LottieView
              source={
                this.props.toRoute === constants.routes.MY_SHIFTS
                  ? myShiftsAnimation
                  : availableShiftsAnimation
              }
              progress={this.state.progress}
            />
          </Content>
          <ButtonText center>
            {this.props.toRoute === constants.routes.MY_SHIFTS
              ? "My shifts"
              : "Available"}
          </ButtonText>
          {utils.isIphoneX() && <StupidIphoneSpacer />}
        </View>
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
