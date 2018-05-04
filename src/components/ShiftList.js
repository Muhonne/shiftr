// @flow

import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import { reduxAutoloader } from "redux-autoloader";

import apiCalls from "../apiCalls";
import { Container, Text } from "../components";
import type { shift, shiftArray } from "../types";

const ShiftList = (props: {
  data: shiftArray,
  isLoading: boolean,
  error: boolean,
  refresh: () => void,
  isRefreshing: boolean,
  title: string
}) => {
  const { title, data, isLoading, error } = props;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Text>
          {title} {data && data.length}
        </Text>
        {data && (
          <FlatList
            data={data}
            renderItem={({ item }) => <Text>{item.area}</Text>}
            keyExtractor={item => item.id}
          />
        )}
      </Container>
    </SafeAreaView>
  );
};

export default reduxAutoloader({
  name: "shifts", // A unique name for the loader
  apiCall: () => apiCalls.getShifts
})(ShiftList);
