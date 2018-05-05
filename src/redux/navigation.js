// @flow

import constants from "../constants";
import type { Routes } from "../types";

export const navigationActions = {
  toMyShifts: () => ({
    type: constants.routes.MY_SHIFTS
  }),
  toAvailableShifts: () => ({
    type: constants.routes.AVAILABLE_SHIFTS
  })
};

type Action = {
  type: Routes
};

type Store = {
  route: Routes
};

const initialState = {
  route: constants.routes.AVAILABLE_SHIFTS
};
// Immer handles everything, we just need to "mutate the state" to get a new immutable state
/* eslint-disable no-param-reassign,no-fallthrough */
export default (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    case constants.routes.MY_SHIFTS:
      return { ...state, route: constants.routes.MY_SHIFTS };
    case constants.routes.AVAILABLE_SHIFTS:
      return { ...state, route: constants.routes.AVAILABLE_SHIFTS };
    default:
      return state;
  }
};
