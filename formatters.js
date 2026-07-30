// formatters.js
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
  // resource: 1 == 1M, rate: 1 == 1K
  // valid inputs: resource: 0 to 500, rate: 1 to 1000
  // guaranted oupts: to <compressed units> units / <remaing K>K
  // out of scope: resource > 500, rate > 1000
  if (!Number.isFinite(resource) || resource < 0) {
    throw new TypeError("Resource must be a valid positive number");
  }

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new TypeError("Rate must be a valid number and greater than 0");
  }

  if (resource > 500 || rate > 1000) {
    throw new TypeError("Out of scope");
  }
  const thousand = 1000;
  const resourceCompressed = Math.floor((resource * thousand) / rate);
  const resourceLeft = (resource * thousand) % rate;

  return `${resourceCompressed} units / ${resourceLeft}K`;
}
