// @flow

import React from "react";
import { FlatList } from "react-native";
import { reduxAutoloader } from "redux-autoloader";
import styled from "styled-components";

import apiCalls from "../apiCalls";
import Text from "./Text";
import type { Shift, ShiftArray } from "../types";
import ShiftListItem from "./ShiftListItem";

const Container = styled.View`
  flex: 1;
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
    const { data, isLoading, error, available } = this.props;
    let items = [];
    if (data) {
      items = data.filter((d: Shift): boolean => d.booked === !available);
    }

    return (
      <Container>
        {data && (
          <FlatList
            style={{ flex: 1 }}
            data={items}
            renderItem={this.renderShift}
            keyExtractor={item => item.id}
          />
        )}
      </Container>
    );
  }
}

export default reduxAutoloader({
  name: "shifts", // A unique name for the loader
  apiCall: () => apiCalls.getShifts
})(ShiftList);
