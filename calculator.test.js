// calculator.test.js
import { calculateResources, isValidResourceAmount } from "./calculator.js";

describe("isValidResourceAmount", () => {
  it.each([[10], [10.5]])("should return true for %p amount", (amount) => {
    const result = isValidResourceAmount(amount);

    expect(result).toBe(true);
  });

  it.each([
    [-1],
    [0],
    [NaN],
    [Infinity],
    [-Infinity],
    [undefined],
    [null],
    ["text"],
    [{}],
    [true],
  ])("should return false for %p amount", (amount) => {
    const result = isValidResourceAmount(amount);

    expect(result).toBe(false);
  });

});

describe("calculateResources", () => {
  it("calculates resources when all inputs are valid", () => {
    const values = {
      food: 10,
      wood: 10,
      silver: 10,
    };
    const result = calculateResources(values);

    expect(result.errors.length).toBe(0);
    expect(result.data.food.gold).toBe(3500);
    expect(result.data.wood.gold).toBe(3500);
    expect(result.data.silver.gold).toBe(3500);
    expect(result.data.food.amount).toBe(300);
    expect(result.data.food.compress).toBe("300 units / 0K");
  });

  it("calculates when some inputs are invalid", () => {
    const values = {
      food: -10,
      wood: 10,
      silver: 10,
    };
    const result = calculateResources(values);

    expect(result.errors.length).toBe(1);
    expect(result.errors).toEqual(["food"]);
    expect(result.data.wood).toBeDefined();
    expect(result.data.silver).toBeDefined();
  });

  it.each([
    [{}],
    [{ food: NaN, wood: -Infinity, silver: Infinity }],
    [{ food: undefined, wood: null, gems: 10 }],
  ])("calculates when values are invalid", (values) => {
    const result = calculateResources(values);

    expect(result.data.food).toBeUndefined();
    expect(result.data.wood).toBeUndefined();
    expect(result.data.silver).toBeUndefined();
    expect(result.errors).toEqual(
      expect.arrayContaining(["food", "silver", "wood"]),
    );
  });
});
