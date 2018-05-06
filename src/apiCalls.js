import { Platform } from "react-native";

const apiUrl = "http://localhost:8080";

export default {
  getShifts: () => fetch(`${apiUrl}/shifts`).then(response => response.json()),
  bookShift: (shiftId: string) => {
    console.log("tryna book", shiftId);
    return fetch(`${apiUrl}/shifts/${shiftId}/book`).then(response =>
      response.json()
    );
  }
};
