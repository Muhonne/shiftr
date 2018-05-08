import React from "react";
import renderer from "react-test-renderer";
import ShiftListItem from "../../src/components/ShiftListItem/View";

describe("Button", () => {
  it("renders with minimun props", () => {
    expect(
      renderer.create(
        <ShiftListItem
          shift={{
            id: "test",
            startTime: new Date(),
            endTime: new Date(),
            booked: false
          }}
        />
      )
    ).toMatchSnapshot();
  });
});
