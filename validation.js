export const validators = Object.freeze({
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

export const validateInput = (data, schema) => {
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

const sanitizeString = (input) => {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>]/g, "");
};
