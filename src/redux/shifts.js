import immer from "immer";
// https://github.com/mweststrate/immer
// https://hackernoon.com/introducing-immer-immutability-the-easy-way-9d73d8f71cb3
import actionTypes from "./actionTypes";

export const shiftActions = {
  getShiftsSaga: () => ({
    type: actionTypes.GET_SHIFTS_SAGA
  }),
  gettingShifts: () => ({
    type: actionTypes.GETTING_SHIFTS
  }),
  gotShifts: shifts => ({
    type: actionTypes.GOT_SHIFTS,
    shifts
  }),
  gettingShiftsFailed: () => ({
    type: actionTypes.FAILED_GETTING_SHIFTS
  })
};

const initialState = {
  gettingShifts: false,
  shifts: [],
  shiftError: false
};

// Immer handles everything, we just need to "mutate the state" to get a new immutable state
/* eslint-disable no-param-reassign,no-fallthrough */
export default immer((state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_SHIFTS:
      state.gettingShifts = true;
    case actionTypes.GOT_SHIFTS:
      state.shifts = action.shifts;
    case actionTypes.FAILED_GETTING_SHIFTS:
      state.gettingShifts = false;
      state.shiftError = true;
    default:
      return state;
  }
});
