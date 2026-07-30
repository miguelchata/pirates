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
    [1, 1, [1, 0]],
    [15000000, 1000, [15000, 0]],
    [2205, 100, [22, 5]],
  ])("converts %p with rate %p as %p", (resource, rate, expected) => {
    const result = convertToCompressed(resource, rate);

    expect(result.compressed * rate + result.remaining).toBe(resource);
    expect(result.compressed).toBe(expected[0]);
    expect(result.remaining).toBe(expected[1]);
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
    [1.1],
  ])("throws when rate is %p", (value) => {
    const aux = 1;
    const resourceResult = () => convertToCompressed(value, aux);
    const rateResult = () => convertToCompressed(aux, value);

    expect(resourceResult).toThrow("Resource must be a whole positive number");
    expect(rateResult).toThrow(
      "Rate must be a whole number and greater than 0",
    );
  });

  it.each([
    [15000001, 1000],
    [15000000, 1001],
  ])("throws when values out of scope", (resource, rate) => {
    const result = () => convertToCompressed(resource, rate);

    expect(result).toThrow("Out of scope");
  });
});