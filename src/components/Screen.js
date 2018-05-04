// @flow

import React from "react";

import type { ChildrenArray, Node } from "react";
import { SafeAreaView, LayoutAnimation } from "react-native";
import styled from "styled-components";

import BottomNavigation from "./BottomNavigation";

const Container = styled.View`
  flex: 1;
`;

class Screen extends React.Component<{ children: ChildrenArray<Node> }, {}> {
  state = {
    height: 10
  };

  componenDidMount() {
    LayoutAnimation.spring();
    this.setState({ height: 500 });
  }

  render() {
    return (
      <Container style={{ height: this.state.height }}>
        <SafeAreaView style={{ flex: 1 }}>{this.props.children}</SafeAreaView>
        <BottomNavigation />
      </Container>
    );
  }
}

export default Screen;
