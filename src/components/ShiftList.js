// @flow

import React from "react";
import { FlatList } from "react-native";
import { reduxAutoloader } from "redux-autoloader";
import styled from "styled-components";

import apiCalls from "../apiCalls";
import Text from "./Text";
import type { shiftArray } from "../types";

const Container = styled.View`
  flex: 1;
`;

const ShiftList = (props: {
  data: shiftArray,
  isLoading: boolean,
  error: boolean,
  refresh: () => void,
  isRefreshing: boolean,
  available?: boolean
}) => {
  const { data, isLoading, error, available } = props;
  let items = [];
  if (data) {
    items = data.filter(d => d.booked === !available);
  }
  return (
    <Container>
      {data && (
        <FlatList
          style={{ flex: 1 }}
          data={items}
          renderItem={({ item }) => <Text>{item.area}</Text>}
          keyExtractor={item => item.id}
        />
      )}
    </Container>
  );
};

export default reduxAutoloader({
  name: "shifts", // A unique name for the loader
  apiCall: () => apiCalls.getShifts
})(ShiftList);
