// @flow

import React from "react";
import { Provider } from "react-redux";
import { UIManager, SafeAreaView } from "react-native";
import styled from "styled-components";

/* eslint-disable import/no-unresolved,import/extensions */
// $FlowFixMe
import CityFilter from "./components/CityFilter";
// $FlowFixMe
import DateFilter from "./components/DateFilter";
/* eslint-enable import/no-unresolved,import/extensions */
import ShiftList from "./components/ShiftList";
import NavButton from "./components/NavButton";
import Button from "./components/Button";
import Text from "./components/Text";
import constants from "./constants";
import type { CityTypes } from "./constants";
import store from "./redux/store";

// enable layoutanimations on android
/* eslint-disable no-unused-expressions */
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
/* eslint-enable no-unused-expressions */

const Container = styled.View`
  flex-direction: row;
  border-color: ${constants.colors.grey};
`;
const BottomContainer = styled(Container)`
  border-top-width: 1px;
`;
const TopContainer = styled(Container)`
  border-bottom-width: 1;
`;

const ResetButton = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${constants.spacing.s}px;
`;

export default class Root extends React.Component<
  {},
  { filterBooked: boolean, filterCity: CityTypes, filterDate: string | Date }
> {
  state = {
    filterBooked: false,
    filterCity: "",
    filterDate: ""
  };

  filterByCity = (filterCity: CityTypes) => this.setState({ filterCity });
  filterByDate = (filterDate: Date) => this.setState({ filterDate });

  resetTopFilters = () => this.setState({ filterCity: "", filterDate: "" });

  render() {
    const { filterCity, filterDate, filterBooked } = this.state;

    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <TopContainer>
            <CityFilter
              filterCity={filterCity}
              filterByCity={this.filterByCity}
            />
            <DateFilter
              filterDate={filterDate}
              filterByDate={this.filterByDate}
            />
            {(Boolean(filterDate) || Boolean(filterCity)) && (
              <Button onPress={this.resetTopFilters}>
                <ResetButton>
                  <Text style={{ color: constants.colors.woltishBlue }}>
                    Clear
                  </Text>
                </ResetButton>
              </Button>
            )}
          </TopContainer>
          <ShiftList
            filterBooked={filterBooked}
            filterCity={filterCity}
            filterDate={filterDate}
          />
          <BottomContainer>
            <NavButton
              label={"My shifts"}
              active={filterBooked}
              onPress={() => this.setState({ filterBooked: true })}
            />
            <NavButton
              label={"Available"}
              active={!filterBooked}
              onPress={() => this.setState({ filterBooked: false })}
            />
          </BottomContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}
