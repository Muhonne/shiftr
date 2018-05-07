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

const CancelButton = styled.View`
  align-self: flex-end;
  padding: ${constants.spacing.m}px;
  margin: ${constants.spacing.m}px;
`;

class DateFilter extends React.Component<
  {
    filterDate: string,
    filterByDate: (date: string) => void
  },
  {
    open: boolean
  }
> {
  state = { open: true };

  toggle = () => this.setState({ open: !this.state.open });

  datePicked = (date: string) => {
    this.props.filterByDate(date);
    this.setState({ open: false });
  };

  render() {
    const { filterDate } = this.props;
    return (
      <Container>
        <Button onPress={this.toggle}>
          <Text center style={{ color: constants.colors.darkGreen }}>
            {utils.dateToString(filterDate) || "All dates"}
          </Text>
        </Button>
        <Modal
          visible={this.state.open}
          onRequestClose={this.toggle}
          animationType={constants.modalAnimation}
        >
          <SafeAreaView>
            <DatePickerIOS
              mode={"date"}
              date={new Date()}
              onDateChange={this.datePicked}
            />
            <Button onPress={this.toggle}>
              <CancelButton>
                <Text
                  style={{
                    color: constants.colors.darkGreen
                  }}
                >
                  Cancel
                </Text>
              </CancelButton>
            </Button>
          </SafeAreaView>
        </Modal>
      </Container>
    );
  }
}

export default DateFilter;
