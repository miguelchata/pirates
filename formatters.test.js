// formatters.test.js
import { formatLargeNumber, convertToCompressed } from "./formatters";

describe("formatLargeNumber", () => {
  it.each([
    [500, "500K"],
    [1000, "1M"],
    [1500, "1M - 500K"],
    [0, "0"],
    [2400, "2M - 400K"],
  ])("formats %p as %p", (big, expected) => {
    const result = formatLargeNumber(big);

    expect(result).toBe(expected);
  });

  it.each([[null], [NaN], [Infinity], [-Infinity], [{}], ["text"], [true]])(
    "formats for invalid number %p",
    (big) => {
      const result = formatLargeNumber(big);

      expect(result).toBe("0");
    },
  );
});

describe("convertToCompressed", () => {
  it.each([
    [1, "1 units / 0K"],
    [1.5, "1 units / 500K"],
    [0.001, "0 units / 1K"],
    [0.999, "0 units / 999K"],
  ])("converts %i with rate 1000 as %p", (resource, expected) => {
    const rate = 1000;
    const result = convertToCompressed(resource, rate);

    expect(result).toBe(expected);
  });

  it.each([
    [-1],
    [NaN],
    [undefined],
    ["text"],
    [{}],
    [true],
    [false],
    [Infinity],
    [-Infinity],
  ])("throws when rate is %p", (rate) => {
    const resource = 0;
    const result = () => convertToCompressed(resource, rate);

    expect(result).toThrow("Rate must be a valid number and greater than 0");
  });

  it.each([
    [-1],
    [NaN],
    [undefined],
    ["text"],
    [{}],
    [true],
    [false],
    [Infinity],
    [-Infinity],
  ])("throws when resource is %p", (resource) => {
    const rate = 100;
    const result = () => convertToCompressed(resource, rate);

    expect(result).toThrow("Resource must be a valid positive number");
  });

  it("throws when values out of scope", () => {
    const resource = Number.MAX_SAFE_INTEGER;
    const rate = 1000;
    const result = () => convertToCompressed(resource, rate);

    expect(result).toThrow("Out of scope");
  });
});