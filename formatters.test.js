// formatters.test.js
import { formatLargeNumber, convertToCompressed } from "./formatters";

describe("formatLargeNumber", () => {
  it("formats 500 as 500k", () => {
    const number = 500;
    const result = formatLargeNumber(number);

    expect(result).toBe("500K");
  })

  it("formats 1000 as 1M", () => {
    const number = 1000;
    const result = formatLargeNumber(number);

    expect(result).toBe("1M");
  })

  it("formats 1500 as 1M - 500K", () => {
    const number = 1500;
    const result = formatLargeNumber(number);

    expect(result).toBe("1M - 500K");
  })

  it("formats 0 as 0", () => {
    const number = 0;
    const result = formatLargeNumber(number);

    expect(result).toBe("0");
  })
  it("formats 2500 as 2M - 500k", () => {
    const number = 2500;
    const result = formatLargeNumber(number);

    expect(result).toBe("2M - 500K");
  })
})

describe("convertToCompressed", () => {
  it("converts 1 with rate 1000 as 1 units / 0K", () => {
    const resource= 1;
    const rate = 1000;
    const result = convertToCompressed(resource, rate);

    expect(result).toBe("1 units / 0K");
  })

  it("converts 1.5 with rate 1000 as 1 units / 500K", () => {
    const resource= 1.5;
    const rate = 1000;
    const result = convertToCompressed(resource, rate);

    expect(result).toBe("1 units / 500K");
  })
  it("converts 0.001 with rate 1000 as 1 units", () => {
    const resource = 0.001;
    const rate = 1000;
    const result = convertToCompressed(resource, rate);

    expect(result).toBe("0 units / 1K");
  });
  it("converts 0.001 with rate 1000 as 1 units", () => {
    const resource = 0.999;
    const rate = 1000;
    const result = convertToCompressed(resource, rate);

    expect(result).toBe("0 units / 999K");
  });
})