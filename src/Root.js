import React from "react";
import { Provider } from "react-redux";
import { UIManager } from "react-native";

import Navigator from "./Navigator";
import store from "./redux/store";

// enable layoutanimations on android
/* eslint-disable no-unused-expressions */
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
/* eslint-enable no-unused-expressions */

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
