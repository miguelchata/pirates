// ui.js
import { formatLargeNumber, convertToCompressed } from "./formatters.js";
import { calculateResources, RESOURCES } from "./calculator.js";
import { validateInput } from "./validation.js";

const calcButton = document.getElementById("button-calculate");

calcButton.addEventListener("click", handleCalculateClick);

const userSchema = {
  food: { type: "number", required: true, min: 0, max: 500 },
  wood: { type: "number", required: true, min: 0, max: 500 },
  silver: { type: "number", required: true, min: 0, max: 500 },
};

// 2. Incoming raw data (e.g., from an API or form submission)
const userInput = {
  username: "  johndoe  ",
  age: 25,
  email: "john.doe@example.com",
};

// 3. Execute validation
// const result = validateInput(userInput, userSchema);

// if (!result.isValid) {
//   console.error("Validation failed:", result.errors);
// } else {
//   console.log("Clean data ready for processing:", result.sanitizedData);
// }

const uiIds = Object.freeze({
  food: {
    input: "food-input",
    result: "food-result",
    error: "food-error",
  },
  wood: {
    input: "wood-input",
    result: "wood-result",
    error: "wood-error",
  },
  silver: {
    input: "silver-input",
    result: "silver-result",
    error: "silver-error",
  },
  // gold: {
  //   input: "gold-input",
  //   result: "gold-result",
  //   error: "gold-error",
  // },
});

const ui = collectUI();

console.log(ui);

function handleCalculateClick() {
  clearUI();
  const values = collectValues();
  const result = validateInput(values, userSchema);
  console.log(result);

  const results = calculateResources(values);

  // renderErrors(errors);
  renderResults(results);
}

function collectUI() {
  const elements = {};

  for (const resource of Object.values(uiIds)) {
    elements[resource.input] = document.getElementById(resource.input);
    elements[resource.result] = document.getElementById(resource.result);
    elements[resource.error] = document.getElementById(resource.error);
  }

  return elements;
}

function collectValues() {
  const values = {};

  for (const [key, value] of Object.entries(uiIds)) {
    values[key] = Number(ui[value.input].value);
  }

  return values;
}

function clearUI() {
  for (const resource of Object.values(uiIds)) {
    // ui[resource.result].innerText = "";
    // ui[resource.error].innerText = "";
  }
}

function renderErrors(errors) {
  for (const error of errors) {
    const resource = uiIds[error];

    ui[resource.error].innerText =
      "Input should be a number and greater than zero!";
  }
}

function renderResults(results) {
  let totalGold = 0;
  console.log(results);

  for (const [key, value] of Object.entries(results.data)) {
    const resourceUI = uiIds[key];
    const resource = RESOURCES[key];
    const resourceCompressed = convertToCompressed(
      value.amount,
      resource.compressionRate,
    );
    const goldCompressed = convertToCompressed(value.gold, 1000);
    const resourceFormat = formatOutput(resourceCompressed, " units");
    const goldFormat = formatOutput(goldCompressed, "M");

    ui[resourceUI.result].innerText =
      `Amount: ${value.amount / 1000}M - Gold: ${goldFormat} Compressed: ${resourceFormat}`;
    totalGold += value.gold;
  }
  const compressedGold = convertToCompressed(results.totalGold, 1000);

  // ui[uiIds.gold.result].innerText =
  //   `Total Gold: ${compressedGold.compressed}M - ${compressedGold.remaining}K`;
}

function formatOutput({ compressed, remaining }, unit) {
  return `${compressed}${unit} / ${remaining}K`;
}
