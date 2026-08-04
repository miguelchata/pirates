// ui.js
import { formatLargeNumber, convertToCompressed } from "./formatters.js";
import { calculateResources, RESOURCES } from "./calculator.js";

const calcButton = document.getElementById("button-calculate");

calcButton.addEventListener("click", handleCalculateClick);

const validators = Object.freeze({
  string: (val, rule) => {
    if (typeof val !== "string") return "Must be a text string.";
    if (rule.minLength && val.length < rule.minLength)
      return `Must be at least ${rule.minLength} characters.`;
    if (rule.maxLength && val.length > rule.maxLength)
      return `Must be no more than ${rule.maxLength} characters.`;
    if (rule.pattern && !rule.pattern.test(val)) return "Invalid format.";
    return null;
  },
  number: (val, rule) => {
    if (typeof val !== "number" || Number.isNaN(val))
      return "Must be a valid number.";
    if (rule.min !== undefined && val < rule.min)
      return `Must be at least ${rule.min}.`;
    if (rule.max !== undefined && val > rule.max)
      return `Must be no more than ${rule.max}.`;
    return null;
  },
  email: (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof val !== "string" || !emailRegex.test(val))
      return "Invalid email address format.";
    return null;
  },
});

const validationConfig = Object.freeze({
  food: [
    { type: "isInteger", message: "Food must be a whole number." },
    { type: "rangeAmount", message: "Fodd must be between 0 and 500" },
  ],
  wood: [
    { type: "isInteger", message: "Wood must be a whole number." },
    { type: "rangeAmount", message: "Wodd must be between 0 and 500" },
  ],
  silver: [
    { type: "isInteger", message: "Silver must be a whole number." },
    { type: "rangeAmount", message: "Silver must be between 0 and 500" },
  ],
});

// 1. Define your schema rules
const userSchema = {
  username: { type: "string", required: true, minLength: 3, maxLength: 20 },
  age: { type: "number", min: 18, max: 120 },
  email: { type: "email", required: true },
};

// 2. Incoming raw data (e.g., from an API or form submission)
const userInput = {
  username: "  johndoe  ",
  age: 25,
  email: "john.doe@example.com",
};

// 3. Execute validation
const result = validateInput(userInput, userSchema);

if (!result.isValid) {
  console.error("Validation failed:", result.errors);
} else {
  console.log("Clean data ready for processing:", result.sanitizedData);
}

const sanitizeString = (input) => {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>]/g, "");
};

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

 const validateInput = (data, schema) => {
   const errors = {};
   const sanitizedData = {};

   for (const [field, rules] of Object.entries(schema)) {
     let value = data[field];

     // Check for required fields
     if (value === undefined || value === null || value === "") {
       if (rules.required) {
         errors[field] = "This field is required.";
       }
       continue;
     }

     // Sanitize if it's a string
     if (typeof value === "string") {
       value = sanitizeString(value);
     }

     sanitizedData[field] = value;

     // Apply type/rule validator
     if (validators[rules.type]) {
       const error = validators[rules.type](value, rules);
       if (error) {
         errors[field] = error;
       }
     }
   }

   return {
     isValid: Object.keys(errors).length === 0,
     errors,
     sanitizedData,
   };
 };

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
  console.log(results);

  for (const [key, value] of Object.entries(results.data)) {
    const resourceUI = uiIds[key];
    const resource = RESOURCES[key];
    const resourceCompressed = convertToCompressed(
      value.amount,
      resource.compressionRate,
    );
    const goldCompressed = convertToCompressed(value.gold, 1000);
    const resourceFormat = formatOutput(resourceCompressed, ' units');
    const goldFormat = formatOutput(goldCompressed, 'M');

    ui[resourceUI.result].innerText =
      `Amount: ${value.amount / 1000}M - Gold: ${goldFormat} Compressed: ${resourceFormat}`;
    totalGold += value.gold;
  }
  const compressedGold = convertToCompressed(results.totalGold, 1000);

  ui[uiIds.gold.result].innerText =
    `Total Gold: ${compressedGold.compressed}M - ${compressedGold.remaining}K`;
}

function formatOutput({ compressed, remaining }, unit) {
  return `${compressed}${unit} / ${remaining}K`;
}
