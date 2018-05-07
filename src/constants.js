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
  animationDuration: 300,
  modalAnimation: "slide",
  colors: {
    black: "#000",
    white: "#fff",
    darkGreen: "#3f6066",
    lightGreen: "#429dab",
    greenBg: "#b6d2d1",
    grey: "#9ca09f",
    red: "#ef727a"
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
