// @flow

import React from "react";
import styled from "styled-components";

import NavButton from "./NavButton";
import constants from "../constants";
import type { routes } from "../types";

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  border-top-width: 1px;
  border-color: #cacaca;
`;

const BottomNavigation = () => {
  return (
    <Container>
      <NavButton toRoute={constants.routes.MY_SHIFTS} />
      <NavButton toRoute={constants.routes.AVAILABLE_SHIFTS} />
    </Container>
  );
};

export default BottomNavigation;
