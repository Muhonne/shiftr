import { reduxAutoloader } from "redux-autoloader";

import apiCalls from "../../apiCalls";
import View from "./View";

export default reduxAutoloader({
  startOnMount: false,
  name: props => props.shift.id,
  apiCall: props => apiCalls.getShift(props.shift.id)
})(View);
