import { reduxAutoloader } from "redux-autoloader";

import apiCalls from "../../apiCalls";
import View from "./View";
import utils from "../../utils";

export default reduxAutoloader(
  {
    name: "shifts", // A unique name for the loader
    apiCall: apiCalls.getShifts
  },
  state => ({
    ...state,
    data: state.data ? utils.filterPastShifts(state.data) : undefined
  })
)(View);
