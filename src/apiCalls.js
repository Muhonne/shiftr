const apiUrl = "http://localhost:8080";

export default {
  getShifts: () => fetch(`${apiUrl}/shifts`).then(response => response.json()),
  getShift: (id: string) =>
    fetch(`${apiUrl}/shifts/${id}`).then(response => response.json()),
  book: (shiftId: string) => {
    console.log("BOOKING", shiftId);
    return fetch(`${apiUrl}/shifts/${shiftId}/book`, { method: "POST" }).then(
      response => response.json()
    );
  },
  cancel: (shiftId: string) => {
    console.log("CANCELING");
    return fetch(`${apiUrl}/shifts/${shiftId}/cancel`, { method: "POST" }).then(
      response => response.json()
    );
  }
};
