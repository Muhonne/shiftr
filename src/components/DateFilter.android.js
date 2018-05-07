// @flow

import React from "react";
import { DatePickerAndroid } from "react-native";
import styled from "styled-components";

import constants from "../constants";
import Button from "./Button";
import Text from "./Text";
import utils from "../utils";

const Container = styled.View`
  flex: 1;
  margin: ${constants.spacing.s}px;
  border-bottom-width: 1;
  border-bottom-color: ${constants.colors.darkGreen};
  align-items: center;
  justify-content: center;
`;

const DateFilter = (props: { filterDate: string, filterByDate: string }) => {
  const { filterDate, filterByDate } = props;

  const getDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const date = new Date(year, month, day);
        filterByDate(date);
      }
    } catch ({ code, message }) {
      // when would this fail?
      console.warn("Cannot open date picker", code, message);
    }
  };

  return (
    <Container>
      <Button onPress={getDate}>
        <Text center style={{ color: constants.colors.darkGreen }}>
          {utils.dateToString(filterDate) || "All dates"}
        </Text>
      </Button>
    </Container>
  );
};

export default DateFilter;
