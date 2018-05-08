// @flow

import React from "react";
import styled from "styled-components";
import Button from "../Button";
import LayoutAnimation from "../../LayoutAnimation";
import ActivityIndicator from "../ActivityIndicator";
import Text from "../Text";
import constants from "../../constants";

const View = styled.View``;

const ButtonContent = styled.View`
  padding: ${constants.spacing.s}px;
  margin-bottom: ${constants.spacing.s};
  border-width: 1;
  border-color: ${constants.colors.woltishBlue};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${props => (props.error ? 0.5 : 1)};
`;

type Props = {
  isLoading: boolean,
  data: any,
  refresh: () => void,
  refreshParent: () => void,
  parentBooked: boolean,
};

const ShiftButton = (props: Props) => {
  LayoutAnimation();
  const {
    refresh,
    data,
    isLoading,
    refreshParent,
    parentBooked,
  } = props;
  if (data && !data.statusCode && data.booked !== parentBooked) {
    // if it's stupid but it works it's not stupid
    // regardless this is a bit shit and there is no refreshing/loading indicator on the parent so
    // if it takes a while to update the text won't change and it looks like nothing is happening
    refreshParent();
  }
  const error = data && data.message;
  return (
    <View>
      <Button onPress={refresh}>
        <ButtonContent error={error}>
          <Text
            large
            style={{
              color: constants.colors.woltishBlue
            }}
          >
            {parentBooked ? "Cancel" : "Book"}
          </Text>
          {isLoading && (
            <ActivityIndicator style={{ marginLeft: 5 }} size="small" />
          )}
        </ButtonContent>
      </Button>
      {error && <Text center>{data.message}</Text>}
    </View>
  );
};

export default ShiftButton;
