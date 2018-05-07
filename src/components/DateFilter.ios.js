import React from "react";
import { DatePickerIOS } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
`;

const DateFilter = props => (
  <Container>
    <DatePickerIOS date={new Date()} />
  </Container>
);

export default DateFilter;
