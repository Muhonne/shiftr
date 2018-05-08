import React from "react";
import { Modal, SafeAreaView } from "react-native";
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

const OpenButton = styled.View`
  padding: ${constants.spacing.s}px;
  align-items: center;
  justify-content: center;
`;

const CityButton = styled.View`
  padding: ${constants.spacing.s}px;
  border-bottom-width: 1;
  border-bottom-color: ${constants.colors.grey};
  flex-direction: row;
  align-items: center;
`;

const Selected = styled.View`
  width: ${constants.spacing.s};
  height: ${constants.spacing.s};
  border-radius: ${constants.spacing.s};
  background-color: ${constants.colors.woltishBlue};
  position: absolute;
  right: ${constants.spacing.s};
`;

export default class CityFilter extends React.Component<
  {
    filterCity: CityTypes,
    filterByCity: (city: CityTypes) => void
  },
  {}
> {
  state = {
    open: false
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  selectCity = (city: CityTypes) => {
    this.props.filterByCity(city);
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { filterCity } = this.props;
    return (
      <Container>
        <Button onPress={this.toggle}>
          <OpenButton>
            <Text center style={{ color: constants.colors.woltishBlue }}>
              {filterCity || "All cities"}
            </Text>
          </OpenButton>
        </Button>
        <Modal
          visible={open}
          onRequestClose={this.toggle}
          animationType={constants.modalAnimation}
        >
          <SafeAreaView style={{ marginTop: constants.spacing.l * 2 }}>
            {constants.cities.map(c => (
              <Button key={c} onPress={() => this.selectCity(c)}>
                <CityButton>
                  <Text style={{ color: constants.colors.woltishBlue }}>
                    {c || "All cities"}
                  </Text>
                  {c === filterCity && <Selected />}
                </CityButton>
              </Button>
            ))}
          </SafeAreaView>
        </Modal>
      </Container>
    );
  }
}
