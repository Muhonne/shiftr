// @flow

export default {
  fontSize: {
    large: 18,
    normal: 16,
    small: 12
  },
  spacing: {
    s: 10,
    m: 20,
    l: 30
  },
  modalAnimation: "slide",
  colors: {
    black: "#000",
    white: "#fff",
    woltishBlue: "#006bb4",
    lightBlue: "#ccebff",
    grey: "#cacaca",
    error: "#cc0000"
  },
  cities: [
    "",
    // should probably be gotten from available shifts
    "Helsinki",
    "Turku",
    "Tampere"
  ]
};

export type CityTypes = "" | "Helsinki" | "Turku" | "Tampere";

export type Shift = {
  id: string,
  booked: boolean,
  area: string,
  startTime: string,
  endTime: string
};

export type ShiftArray = Array<Shift>;
