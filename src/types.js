// @flow

import constants from "./constants";

export type Shift = {
  id: string,
  booked: boolean,
  area: string,
  startTime: string,
  endTime: string
};

export type ShiftArray = Array<Shift>;

export type Routes =
  | constants.routes.MY_SHIFTS
  | constants.routes.AVAILABLE_ROUTES;
