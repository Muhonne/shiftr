/* eslint-disable import/prefer-default-export */

import styled from "styled-components";
import constants from "../constants";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: ${props =>
    props.large ? constants.fontSize.large : constants.fontSize.normal};
`;
