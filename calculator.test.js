// calculator.test.js
import { calculateResources, isValidResourceAmount } from "./calculator.js";

describe("isValidResourceAmount", () => {
  it("should return true for valid resource amount", () => {
    const amount = 10;
    const result = isValidResourceAmount(amount);

    expect(result).toBe(true);
  });

  it("should be return false for invalid resource amount", () => {
    const amount = -10;
    const result = isValidResourceAmount(amount);

    expect(result).toBe(false);
  });
  it("should be return false for 0", () => {
    const amount = 0;
    const result = isValidResourceAmount(amount);

    expect(result).toBe(false);
  });
  it("should be return false for NaN", () => {
    const amount = NaN;
    const result = isValidResourceAmount(amount);

    expect(result).toBe(false);
  });
  it("should be return false for Infinity", () => {
    const amount = Infinity;
    const result = isValidResourceAmount(amount);

    expect(result).toBe(false);
  });
  it("should be return false for -Infinity", () => {
    const amount = -Infinity;
    const result = isValidResourceAmount(amount);

    expect(result).toBe(false);
  });
});

describe("calculateResources", () => {
  it("calculates resources when all inputs area valid", () => {
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

  it("calculates when inputs are empty", () => {
    const values = {};
    const result = calculateResources(values);

    expect(result.data).toStrictEqual({});
    expect(result.errors).toEqual(
      expect.arrayContaining(["food", "wood", "silver"]),
    );
    expect(result.errors).toHaveLength(3);
  });

  it("calculates when inputs are invalid", () => {
    const values = {
      food: NaN,
      wood: -Infinity,
      silver: Infinity,
    };
    const result = calculateResources(values);

    expect(result.data.food).toBeUndefined();
    expect(result.errors).toEqual(["food", "wood", "silver"]);
  });
});
