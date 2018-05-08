// @flow

import React from "react";
import { ActivityIndicator as NativeIndicator } from "react-native";
import constants from "../constants";

const ActivityIndicator = (props: { size: "small" | "large" }) => (
  <NativeIndicator size={props.size} color={constants.colors.woltishBlue} />
);

export default ActivityIndicator;
