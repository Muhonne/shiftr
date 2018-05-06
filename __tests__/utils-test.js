import utils from "../src/utils";

describe("utils date mälving", () => {
  it("formats date to my format", () => {
    const date = new Date();
    date.setDate(11);
    date.setMonth(3);
    date.setFullYear(1988);
    date.setHours(12);
    date.setMinutes(25);
    expect(utils.formatDate(date.getTime())).toEqual("11.04.1988 12:25");
  });

  it("gets correct duration between two dates", () => {
    const date1 = new Date();
    const date2 = new Date();
    date1.setDate(1);
    date1.setHours(10);
    date2.setDate(1);
    date2.setHours(13);
    expect(utils.getDuration(date1.getTime(), date2.getTime())).toEqual(
      "3h 00min"
    );
  });

  it("filters items according to current date", () => {
    // can't handle shifts where start date !== end date
    const now = new Date();
    const shifts = [
      { startTime: new Date().setHours(now.getHours() + 1), id: "first" },
      { startTime: new Date().setHours(now.getHours() - 2), id: "second" },
      { startTime: new Date().setHours(now.getHours() + 2), id: "third" },
      { startTime: new Date().setHours(now.getHours() - 6), id: "fourth" }
    ];
    expect(utils.filterPastShifts(shifts).length).toEqual(2);
  });
});
