import { connect } from "react-redux";

import { shiftActions } from "../../redux/shifts";
import View from "./view";

const mapState = shifts => ({
  shifts
});

const mapDispatch = dispatch => ({
  getShiftsSaga: () => dispatch(shiftActions.getShiftsSaga())
});

export default connect(mapState, mapDispatch)(View);
