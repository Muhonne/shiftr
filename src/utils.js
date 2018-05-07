// @flow

import moment from "moment";
import type { Shift, ShiftArray } from "./constants";

export default {
  formatDate: (millis: number | string): string =>
    moment(millis).format("DD.MM.YYYY H:mm"),
  dateToString: (date: string) => {
    if (!date) return date;
    return moment(date).format("DD.MM.YYYY");
  },
  getDuration: (start: string, end: string) =>
    // lazy copy-paste https://stackoverflow.com/questions/18623783/get-the-time-difference-between-two-datetimes
    // will work ONLY when the total duration is less than 24 hours
    moment.utc(moment(end).diff(moment(start))).format("H[h] mm[min]"),
  filterPastShifts: (shifts: ShiftArray) => {
    const now = new Date().getTime();
    return shifts.filter((s: Shift) => now < parseInt(s.startTime, 10));
  }
};
