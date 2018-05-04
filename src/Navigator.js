// @flow

import React from "react";
import { connect } from "react-redux";

import Screen from "./components/Screen";
import ShiftList from "./components/ShiftList";
import type { routes } from "./types";
import constants from "./constants";


const Navigator = (props: { route: routes }) => {
  switch (props.route) {
    case constants.routes.MY_SHIFTS:
      return (
        <Screen>
          <ShiftList title={"My Shifts"} />
        </Screen>
      );
    case constants.routes.AVAILABLE_SHIFTS:
      return (
        <Screen>
          <ShiftList title={"Available shifts"} />
        </Screen>
      );

    default:
      return (
        <Screen>
          <ShiftList />
        </Screen>
      );
  }
};

export default connect(
  ({ navigation }) => ({ route: navigation.route }),
  () => ({})
)(Navigator);
