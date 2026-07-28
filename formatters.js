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
  const resourceLeft = (resource * 1000) % rate;
  const resourceCompressed = (resource * 1000 - resourceLeft) / rate;

  return `${resourceCompressed} units / ${resourceLeft}K`;
}
