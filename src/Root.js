import React from "react";
import { Provider } from "react-redux";
import { UIManager, View } from "react-native";

import Navigator from "./Navigator";
import BottomNavigation from "./components/BottomNavigation";

import store from "./redux/store";

// enable layoutanimations on android
/* eslint-disable no-unused-expressions */
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
/* eslint-enable no-unused-expressions */

export default () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <Navigator />
      <BottomNavigation />
    </View>
  </Provider>
);
