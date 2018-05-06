// @flow

import { Dimensions, Platform } from "react-native";
import moment from "moment";
import type { Shift, ShiftArray } from "./types";

export default {
  isIphoneX: (): boolean => {
    // lazy copy-paste https://aaronpresley.com/determine-if-on-iphone-x-in-react-native/
    const d = Dimensions.get("window");
    const { height, width } = d;

    return (
      // This has to be iOS duh
      Platform.OS === "ios" &&
      // Accounting for the height in either orientation
      (height === 812 || width === 812)
    );
  },
  formatDate: (millis: number | string): string =>
    moment(millis).format("DD.MM.YYYY H:mm"),
  getDuration: (start: string, end: string) =>
    // lazy copy-paste https://stackoverflow.com/questions/18623783/get-the-time-difference-between-two-datetimes
    // will work ONLY when the total duration is less than 24 hours
    moment.utc(moment(end).diff(moment(start))).format("H[h] mm[min]"),
  filterPastShifts: (shifts: ShiftArray) => {
    const now = new Date().getTime();
    return shifts.filter((s: Shift) => {
      return now < parseInt(s.startTime, 10);
    });
  }
};
