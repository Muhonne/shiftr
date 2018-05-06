import { Platform } from "react-native";

const apiUrl = "http://localhost:8080";

export default {
  getShifts: fetch(`${apiUrl}/shifts`).then(response => response.json())
};
