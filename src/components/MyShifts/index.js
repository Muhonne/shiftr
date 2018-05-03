import { reduxAutoloader } from "redux-autoloader";
import View from "./view";

const MyShifts = reduxAutoloader({
  name: "shifts", // A unique name for the loader
  apiCall: () =>
    fetch("http://localhost:8080/shifts").then(response => response.json()) // A function that returns a promise
})(View);

export default MyShifts;
