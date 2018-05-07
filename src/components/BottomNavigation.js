// @flow

import React from "react";
import styled from "styled-components";

import NavButton from "./NavButton";

const Container = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-color: #cacaca;
`;

const BottomNavigation = (props: {
  filterBooked: boolean,
  filterByBooked: (val: boolean) => void
}) => (
  <Container>
    <NavButton
      active={props.filterBooked}
    />
    <NavButton
      onPress={() => props.filterByBooked(false)}
      active={!!props.filterBooked}
    />
  </Container>
);

export default BottomNavigation;
