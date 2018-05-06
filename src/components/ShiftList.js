// @flow

import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { reduxAutoloader } from "redux-autoloader";
import styled from "styled-components";

import apiCalls from "../apiCalls";
import type { Shift, ShiftArray } from "../types";
import ShiftListItem from "./ShiftListItem";
import Button from "./Button";
import Text from "./Text";
import constants from "../constants";
import utils from "../utils";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ErrorButton = styled.View`
  align-items: center;
  justify-content: center;
  margin: ${constants.spacing.l}px;
  padding: ${constants.spacing.l}px;
  border-width: 1;
  border-color: ${constants.colors.darkGreen};
  border-radius: ${constants.spacing.s};
`;

class ShiftList extends React.Component<
  {
    data: ShiftArray,
    isLoading: boolean,
    error: boolean,
    refresh: () => void,
    isRefreshing: boolean,
    available?: boolean
  },
  {}
> {
  renderShift = ({ item }) => <ShiftListItem shift={item} />;

  render() {
    const {
      data,
      isLoading,
      error,
      available,
      refresh,
      isRefreshing
    } = this.props;
    const active = isLoading || isRefreshing;
    let items = [];
    if (data) {
      items = data.filter((d: Shift): boolean => d.booked === !available);
    }

    return (
      <Container>
        {active && (
          <ActivityIndicator size="large" color={constants.colors.darkGreen} />
        )}
        {error && (
          <Button onPress={refresh}>
            <ErrorButton>
              <Text>Getting shifts failed, tap to try again.</Text>
            </ErrorButton>
          </Button>
        )}
        {data && (
          <FlatList
            style={{ flex: 1 }}
            data={items}
            renderItem={this.renderShift}
            keyExtractor={item => item.id}
            onRefresh={refresh}
            refreshing={isRefreshing}
          />
        )}
      </Container>
    );
  }
}

export default reduxAutoloader(
  {
    name: "shifts", // A unique name for the loader
    apiCall: apiCalls.getShifts
  },
  state => {
    console.log("filter shifts", state.data);
    return {
      ...state,
      data: state.data ? utils.filterPastShifts(state.data) : undefined
    };
  }
)(ShiftList);
