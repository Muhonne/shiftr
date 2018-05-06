// @flow

import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import { reduxAutoloader } from "redux-autoloader";

import apiCalls from "../apiCalls";
import Button from "./Button";
import Text from "./Text";
import constants from "../constants";

const BookingButton = styled.View`
  padding: ${constants.spacing.s}px;
  border-width: 1;
  border-color: ${constants.colors.darkGreen};
  border-radius: ${constants.spacing.s};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

type Props = {
  shiftId: string,
  isLoading: boolean,
  isRefreshing: boolean,
  data: any,
  refresh: () => void
};

const BookShift = (props: Props) => {
  const { isLoading, data, refresh, isRefreshing } = props;
  const active = isLoading || isRefreshing;
  console.log("bookshift renders", props);
  return (
    <Button onPress={refresh}>
      <BookingButton>
        <Text large>BOOK</Text>
        {active && <ActivityIndicator size="small" />}
      </BookingButton>
    </Button>
  );
};

export default reduxAutoloader({
  startOnMount: false,
  loadOnInitialize: false,
  reloadOnMount: false,
  name: (props: Props) => props.shiftId,
  apiCall: (props: Props) => apiCalls.bookShift(props.shiftId)
})(BookShift);
