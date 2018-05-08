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
  border-bottom-color: ${constants.colors.woltishBlue};
  align-items: center;
  justify-content: center;
`;

const DateFilter = (props: { filterDate: string, filterByDate: string }) => {
  const { filterDate, filterByDate } = props;

  const getDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: filterDate || new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const date = new Date(year, month, day);
        filterByDate(date);
      }
    } catch ({ code, message }) {
      // when/how would this fail?
      console.warn("Cannot open date picker", code, message);
    }
  };

  return (
    <Button onPress={getDate}>
      <Container>
        <Text center style={{ color: constants.colors.woltishBlue }}>
          {utils.dateToString(filterDate) || "All dates"}
        </Text>
      </Container>
    </Button>
  );
};

export default DateFilter;
