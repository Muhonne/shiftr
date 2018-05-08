import React from "react";
import renderer from "react-test-renderer";
import ShiftButton from "../../src/components/ShiftButton/View";

describe("Button", () => {
  it("renders without props", () => {
    expect(renderer.create(<ShiftButton />)).toMatchSnapshot();
  });

  it("renders a bookable button", () => {
    expect(
      renderer.create(<ShiftButton parentBooked={false} />)
    ).toMatchSnapshot();
  });

  it("renders a cancel button", () => {
    expect(renderer.create(<ShiftButton parentBooked />)).toMatchSnapshot();
  });

  it("renders a button with error", () => {
    expect(
      renderer.create(
        <ShiftButton
          parentBooked
          data={{ message: "test error message" }}
          refreshParent={() => {}}
        />
      )
    ).toMatchSnapshot();
  });
});
