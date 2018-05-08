// @flow

import React from "react";
import { LayoutAnimation } from "react-native";
import styled from "styled-components";
import { reduxAutoloader } from "redux-autoloader";

import apiCalls from "../apiCalls";
import Button from "./Button";
import ActivityIndicator from "./ActivityIndicator";
import Text from "./Text";
import constants from "../constants";

const View = styled.View``;

const ButtonContent = styled.View`
  padding: ${constants.spacing.s}px;
  margin-bottom: ${constants.spacing.s};
  border-width: 1;
  border-color: ${constants.colors.woltishBlue};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${props => (props.error ? 0.5 : 1)};
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
  const error = data && data.message;
  return (
    <View>
      <Button onPress={refresh}>
        <ButtonContent error={error}>
          <Text
            large
            style={{
              color: constants.colors.woltishBlue
            }}
          >
            {label}
          </Text>
          {isLoading && (
            <ActivityIndicator style={{ marginLeft: 5 }} size="small" />
          )}
        </ButtonContent>
      </Button>
      {error && <Text center>{data.message}</Text>}
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
