import React from "react";
import styled from "styled-components";
import { Picker } from "react-native";

import constants from "../constants";
import type { CityTypes } from "../constants";

const Container = styled.View`
  flex: 1;
  margin: ${constants.spacing.s}px;
  border-bottom-width: 1;
  border-bottom-color: ${constants.colors.darkGreen};
`;

const CityFilter = (props: {
  filterCity: CityTypes,
  filterByCity: (city: CityTypes) => void
}) => {
  const { filterCity, filterByCity } = props;
  return (
    <Container>
      <Picker
        onValueChange={filterByCity}
        selectedValue={filterCity}
        style={{ color: constants.colors.darkGreen }}
      >
        {constants.cities.map(city => (
          <Picker.Item key={city} label={city || "All cities"} value={city} />
        ))}
      </Picker>
    </Container>
  );
};

export default CityFilter;
