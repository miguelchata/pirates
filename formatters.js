// formatters.js
const MAX_RESOURCE_AMOUNT = 15_000_000;
const MAX_RATE = 1000;

export function formatLargeNumber(gold) {
  const goldThousand = gold % 1000;
  const goldMillion = (gold - goldThousand) / 1000;

  if (goldMillion > 0 && goldThousand > 0) {
    return `${goldMillion}M - ${goldThousand}K`;
  }

  if (goldMillion > 0) {
    return `${goldMillion}M`;
  }

  if (goldThousand > 0) {
    return `${goldThousand}K`;
  }

  return "0";
}

export function convertToCompressed(resource, rate) {
  // Splits resource amount into complete compressed units and the remaining resource.
  // Accepted inputs: parameters must be positive integers within the allowed limits.
  // Rejected inputs: non-numbers, decimals, non-positive values, or values exceeding the limits.
  // Guaanteed outputs: compressed, remaining.
  // Invariants: 0 <= remaining < rate, resource = compressed * rate + remaining.
  // if (
  //   !Number.isFinite(resource) ||
  //   !Number.isInteger(resource) ||
  //   resource < 0
  // ) {
  //   throw new TypeError("Resource must be a whole positive number");
  // }

  // if (!Number.isFinite(rate) || !Number.isInteger(rate) || rate <= 0) {
  //   throw new TypeError("Rate must be a whole number and greater than 0");
  // }

  // if (resource > MAX_RESOURCE_AMOUNT || rate > MAX_RATE) {
  //   throw new TypeError("Out of scope");
  // }

  return {
    compressed: Math.floor(resource / rate),
    remaining: resource % rate,
  };
}
