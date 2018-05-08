import React from "react";
import renderer from "react-test-renderer";
import ShiftListItem from "../../src/components/ShiftListItem/View";

const shiftDate = new Date(2000, 1, 1, 1, 1);

describe("Button", () => {
  it("renders with minimun props", () => {
    expect(
      renderer.create(
        <ShiftListItem
          shift={{
            id: "test",
            startTime: shiftDate,
            endTime: shiftDate,
            booked: false
          }}
        />
      )
    ).toMatchSnapshot();
  });
});
