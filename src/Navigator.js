// @flow

import React from "react";
import { connect } from "react-redux";
import { SafeAreaView, LayoutAnimation, View } from "react-native";
import styled from "styled-components";

import ShiftList from "./components/ShiftList";
import type { routes } from "./types";
import constants from "./constants";
import Text from "./components/Text";

const Container = styled(SafeAreaView)`
  flex: 1;
`;

type Props = {
  route: routes
};

class Navigator extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.route !== this.props.route) {
      LayoutAnimation.easeInEaseOut();
      return true;
    }
    return false;
  }
  render() {
    const { route } = this.props;
    return (
      <Container>
        <ShiftList
          route={route}
          available={route === constants.routes.AVAILABLE_SHIFTS}
        />
      </Container>
    );
  }
}

export default connect(
  ({ navigation }) => ({ route: navigation.route }),
  () => ({})
)(Navigator);
