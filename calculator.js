// calculator.js
import { convertToCompressed } from "./formatters.js";

const RESOURCES = Object.freeze({
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

  for (const [key, value] of Object.entries(values)) {
    const resource = RESOURCES[key];
    const amount = value * resource.quantity;
    const gold = value * resource.price;

    data[key] = { amount, gold };
  }

  return data;
}

export function isValidResourceAmount(amount) {
  return Number.isFinite(amount) && amount > 0;
}
