import { reduxAutoloader } from "redux-autoloader";

import apiCalls from "../../apiCalls";
import View from "./View";

export default reduxAutoloader({
  startOnMount: false,
  loadOnInitialize: false,
  reloadOnMount: false,
  name: props => `${props.shiftId}.status`,
  apiCall: props => apiCalls[props.label.toLowerCase()](props.shiftId)
})(View);
