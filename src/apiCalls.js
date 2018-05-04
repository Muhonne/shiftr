import { Platform } from "react-native";

const apiUrl =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

export default {
  getShifts: fetch(`${apiUrl}/shifts`).then(response => response.json())
};
