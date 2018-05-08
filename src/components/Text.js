// @flow

import styled from "styled-components";
import constants from "../constants";

const Text = styled.Text`
  font-size: ${props =>
    props.large ? constants.fontSize.large : constants.fontSize.normal};
  color: ${props =>
    props.blue ? constants.colors.woltishBlue : constants.colors.black};
  align-self: ${props => (props.center ? "center" : "flex-start")};
`;

export default Text;
