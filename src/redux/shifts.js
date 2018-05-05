// @flow
import immer from "immer";
// https://github.com/mweststrate/immer
// https://hackernoon.com/introducing-immer-immutability-the-easy-way-9d73d8f71cb3

type State = {};

const initialState = {};

// Immer handles everything, we just need to "mutate the state" to get a new immutable state
/* eslint-disable no-param-reassign,no-fallthrough */
export default immer((state = initialState, action): State => {
  switch (action.type) {
    default:
      return state;
  }
});
