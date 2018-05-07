// @flow

import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { reduxAutoloader } from "redux-autoloader";
import styled from "styled-components";

import apiCalls from "../apiCalls";

import ShiftListItem from "./ShiftListItem";
import Button from "./Button";
import Text from "./Text";
import constants from "../constants";
import type { Shift, ShiftArray, CityTypes } from "../constants";
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

const Placeholder = styled.View`
  align-items: center;
  justify-content: center;
  margin: ${constants.spacing.l}px;
`;

const Loading = styled.View`
  position: absolute;
  top: ${constants.spacing.l};
  left: ${constants.spacing.l};
  right: ${constants.spacing.l};
`;

class ShiftList extends React.Component<
  {
    data: ShiftArray,
    isLoading: boolean,
    error: boolean,
    refresh: () => void,
    isRefreshing: boolean,
    filterBooked: boolean,
    filterCity: CityTypes,
    filterDate: string
  },
  {}
> {
  renderShift = ({ item }) => {
    if (item.placeholder) {
      return (
        <Placeholder>
          <Text>No booked shifts. Drag down to refresh.</Text>
        </Placeholder>
      );
    }
    return <ShiftListItem shift={item} />;
  };

  render() {
    const {
      data,
      isLoading,
      error,
      refresh,
      isRefreshing,
      filterBooked,
      filterCity,
      filterDate
    } = this.props;
    let items = [];
    if (data) {
      items = data
        .filter((s: Shift): boolean => s.booked === filterBooked)
        .filter(s => !filterCity || s.area === filterCity);
      //.filter(s => !filterDate || utils.dateMatch(s, filterDate));
    }

    return (
      <Container>
        {isLoading && (
          <Loading>
            <ActivityIndicator
              size="large"
              color={constants.colors.darkGreen}
            />
          </Loading>
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
            data={
              items.length === 0
                ? [{ placeholder: true, id: "placeholder" }]
                : items
            }
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
  state => ({
    ...state,
    data: state.data ? utils.filterPastShifts(state.data) : undefined
  })
)(ShiftList);
