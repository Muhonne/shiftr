// @flow

import React from "react";
import { DatePickerIOS, Modal, SafeAreaView } from "react-native";
import styled from "styled-components";

import constants from "../constants";
import Button from "./Button";
import Text from "./Text";
import utils from "../utils";

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

const CancelButton = styled.View`
  align-self: flex-end;
  padding: ${constants.spacing.m}px;
  margin: ${constants.spacing.m}px;
`;

export default class DateFilter extends React.Component<
  {
    filterDate: ?Date,
    filterByDate: (date: Date) => void
  },
  {
    open: boolean
  }
> {
  state = { open: false };

  toggle = () => this.setState({ open: !this.state.open });

  datePicked = (date: Date) => {
    this.props.filterByDate(date);
    this.setState({ open: false });
  };

  render() {
    const { filterDate } = this.props;
    return (
      <Container>
        <Button onPress={this.toggle}>
          <OpenButton>
            <Text center blue>
              {utils.dateToString(filterDate) || "All dates"}
            </Text>
          </OpenButton>
        </Button>
        <Modal
          visible={this.state.open}
          onRequestClose={this.toggle}
          animationType={constants.modalAnimation}
        >
          <SafeAreaView>
            <DatePickerIOS
              mode={"date"}
              date={filterDate || new Date()}
              onDateChange={this.datePicked}
            />
            <Button onPress={this.toggle}>
              <CancelButton>
                <Text blue>Cancel</Text>
              </CancelButton>
            </Button>
          </SafeAreaView>
        </Modal>
      </Container>
    );
  }
}
