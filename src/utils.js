// @flow

import { Dimensions, Platform } from "react-native";

export default {
  isIphoneX: (): boolean => {
    // https://aaronpresley.com/determine-if-on-iphone-x-in-react-native/
    const d = Dimensions.get("window");
    const { height, width } = d;

    return (
      // This has to be iOS duh
      Platform.OS === "ios" &&
      // Accounting for the height in either orientation
      (height === 812 || width === 812)
    );
  },
  formatDate: (millis: number | string): string => {
    const date = new Date(millis);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  },
  getDuration: (start: number | string, end: number | string) => {
    const difference = new Date(new Date(end) - new Date(start));
    return `${difference.getHours()}h ${difference.getMinutes()}m`;
  }
};
