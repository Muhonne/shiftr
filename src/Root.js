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

export default class Root extends React.Component<
  {},
  { filterBooked: boolean, filterCity: CityTypes, filterDate: string }
> {
  state = {
    filterBooked: false,
    filterCity: "",
    filterDate: ""
  };

  filterByCity = (filterCity: CityTypes) => this.setState({ filterCity });
  filterByDate = (filterDate: string) => this.setState({ filterDate });

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <TopContainer>
            <CityFilter
              filterCity={this.state.filterCity}
              filterByCity={this.filterByCity}
            />
            <DateFilter
              filterDate={this.state.filterDate}
              filterByDate={this.filterByDate}
            />
          </TopContainer>
          <ShiftList
            filterBooked={this.state.filterBooked}
            filterCity={this.state.filterCity}
            filterDate={this.state.filterDate}
          />
          <BottomContainer>
            <NavButton
              label={"My shifts"}
              active={this.state.filterBooked}
              onPress={() => this.setState({ filterBooked: true })}
            />
            <NavButton
              label={"Available"}
              active={!this.state.filterBooked}
              onPress={() => this.setState({ filterBooked: false })}
            />
          </BottomContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}
