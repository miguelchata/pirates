// calculator.js
import { convertToCompressed } from "./formatters.js";

export const RESOURCES = Object.freeze({
  food: {
    quantity: 30000,
    price: 350,
    compressionRate: 1000,
  },
  wood: {
    quantity: 5000,
    price: 350,
    compressionRate: 170,
  },
  silver: {
    quantity: 1250,
    price: 350,
    compressionRate: 42,
  },
});

export function calculateResources(values) {
  /*const data = {};
  const errors = [];

  for (const [key, value] of Object.entries(RESOURCES)) {
    const inputValue = values[key];

    if (isValidResourceAmount(inputValue)) {
      const amount = inputValue * value.quantity;
      const gold = inputValue * value.price;
      const compress = convertToCompressed(amount, value.compressionRate);

      data[key] = { amount, gold, compress };
    } else {
      errors.push(key);
    }
  }

  return { data, errors };*/
  // Input: numbers {food, wood, silver}
  // Output: processed {amount, gold, compress}

  const data = {};
  let totalGold = 0;

  for (const [key, resource] of Object.entries(RESOURCES)) {
    const value = values[key];
    const amount = value * resource.quantity;
    const gold = value * resource.price;

    totalGold += gold;
    data[key] = { amount, gold };
  }

  return { data, totalGold };
}

export function isValidResourceAmount(amount) {
  return Number.isFinite(amount) && amount > 0;
}
