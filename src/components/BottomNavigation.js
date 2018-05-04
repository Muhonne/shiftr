// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { navigationActions } from "../redux/navigation";
import NavigationButton from "./NavigationButton";
import utils from "../utils";
import constants from "../constants";
import type { routes } from "../types";

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  padding-bottom: ${utils.isIphoneX() ? 10 : 0};
  border-top-width: 1px;
  border-color: #cacaca;
`;

const BottomNavigation = (props: {
  toMyShifts: () => void,
  toAvailableShifts: () => void,
  route: routes
}) => {
  const { toMyShifts, toAvailableShifts, route } = props;
  return (
    <Container>
      <NavigationButton
        toRoute={toMyShifts}
        active={route === constants.routes.MY_SHIFTS}
        text="mein"
      />
      <NavigationButton
        toRoute={toAvailableShifts}
        active={route === constants.routes.AVAILABLE_SHIFTS}
        text="avail"
      />
    </Container>
  );
};

export default connect(
  ({ navigation }) => ({ route: navigation.route }),
  dispatch => ({
    toMyShifts: () => dispatch(navigationActions.toMyShifts()),
    toAvailableShifts: () => dispatch(navigationActions.toAvailableShifts())
  })
)(BottomNavigation);
