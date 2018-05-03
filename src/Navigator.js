import { TabNavigator } from "react-navigation";

import MyShifts from "./components/MyShifts";
import AvailableShifts from "./components/Availableshifts";

export default TabNavigator({
  Home: { screen: MyShifts },
  Settings: { screen: AvailableShifts }
});
