import React from "react";
import { PickerIOS } from "react-native";
import styled from "styled-components";

import constants from "../constants";
import type { CityTypes } from "../constants";
import Button from "./Button";
import Text from "./Text";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: ${constants.spacing.s}px;
`;

export default class CityFilter extends React.Component<
  {
    filterCity: CityTypes,
    filterByCity: (city: CityTypes) => void
  },
  {}
> {
  state = {
    open: true
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;
    const { filterByCity, filterCity } = this.props;
    if (!open) {
      return (
        <Container>
          <Button onPress={this.toggle}>
            <Text center style={{ color: constants.colors.darkGreen }}>
              Helsinki
            </Text>
          </Button>
        </Container>
      );
    }

    return <Text>plz be implementing</Text>;
  }
}
