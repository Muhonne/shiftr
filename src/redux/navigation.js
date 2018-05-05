// @flow

import constants from "../constants";
import type { routes } from "../types";

const actionTypes = constants.routes;

export const navigationActions = {
  toMyShifts: () => ({
    type: actionTypes.TO_MY_SHIFTS
  }),
  toAvailableShifts: () => ({
    type: actionTypes.TO_AVAILABLE_SHIFTS
  })
};

type Action = {
  type: routes
};

type Store = {
  route: routes
};

const initialState = {
  route: constants.routes.MY_SHIFTS
};
// Immer handles everything, we just need to "mutate the state" to get a new immutable state
/* eslint-disable no-param-reassign,no-fallthrough */
export default (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    case actionTypes.TO_MY_SHIFTS:
      return { ...state, route: constants.routes.MY_SHIFTS };
    case actionTypes.TO_AVAILABLE_SHIFTS:
      return { ...state, route: constants.routes.AVAILABLE_SHIFTS };
    default:
      return state;
  }
};
