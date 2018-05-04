// @flow

import constants from "./constants";

export type shift = {
  id: string,
  booked: boolean,
  area: string,
  startTime: string,
  endTime: string
};

export type shiftArray = Array<shift>;

export type routes =
  | constants.routes.MY_SHIFTS
  | constants.routes.AVAILABLE_ROUTES;
