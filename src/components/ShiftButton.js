// @flow

import React from "react";
import { ActivityIndicator, LayoutAnimation } from "react-native";
import styled from "styled-components";
import { reduxAutoloader } from "redux-autoloader";

import apiCalls from "../apiCalls";
import Button from "./Button";
import Text from "./Text";
import constants from "../constants";

const View = styled.View``;

const ButtonContent = styled.View`
  padding: ${constants.spacing.s}px;
  border-width: 1;
  border-color: ${constants.colors.darkGreen};
  border-radius: ${constants.spacing.s};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${props =>
    props.error ? constants.colors.red : constants.colors.white};
`;

type Props = {
  shiftId: string, // eslint-disable-line react/no-unused-prop-types,:type used in connect
  isLoading: boolean,
  data: any,
  refresh: () => void,
  refreshParent: () => void,
  parentBooked: boolean,
  label: string
};

const ShiftButton = (props: Props) => {
  LayoutAnimation.easeInEaseOut();
  const {
    refresh,
    data,
    isLoading,
    refreshParent,
    parentBooked,
    label
  } = props;
  if (data && !data.statusCode && data.booked !== parentBooked) {
    refreshParent();
  }
  return (
    <View>
      <Button onPress={refresh}>
        <ButtonContent>
          <Text large>{label}</Text>
          {isLoading && <ActivityIndicator size="small" />}
        </ButtonContent>
      </Button>
      {data && data.message && <Text>{data.message}</Text>}
    </View>
  );
};

export default reduxAutoloader({
  startOnMount: false,
  loadOnInitialize: false,
  reloadOnMount: false,
  name: (props: Props) => `${props.shiftId}.status`,
  apiCall: (props: Props) => apiCalls[props.label.toLowerCase()](props.shiftId)
})(ShiftButton);
