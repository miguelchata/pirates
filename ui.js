// ui.js
import { formatLargeNumber } from "./formatters.js";
import { calculateResources } from "./calculator.js";

const calcButton = document.getElementById("button-calculate");

calcButton.addEventListener("click", handleCalculateClick);

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
  gold: {
    input: "gold-input",
    result: "gold-result",
    error: "gold-error",
  },
});

const ui = collectUI();

function handleCalculateClick() {
  clearUI();
  const values = collectValues();

  const { data, errors } = calculateResources(values);

  renderErrors(errors);
  renderResults(data);
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
    ui[resource.result].innerText = "";
    ui[resource.error].innerText = "";
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

  for (const [key, value] of Object.entries(results)) {
    const resourceUI = uiIds[key];

    ui[resourceUI.result].innerText =
      `Amount: ${value.amount}M - Gold: ${formatLargeNumber(value.gold)} Compressed: ${value.compress}`;
    totalGold += value.gold;
  }

  ui[uiIds.gold.result].innerText =
    `Total Gold: ${formatLargeNumber(totalGold)}`;
}
