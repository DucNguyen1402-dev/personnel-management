/** * Fields that must be converted to numeric values.
 * @type {Set<string>} 
 */
const NUMBER_FIELDS = new Set(["baseSalary", "workingHours"]);

/**
 * Casts field values to their appropriate types based on the field name.
 * @param {string} type - The field identifier/key.
 * @param {string} value - The raw string value from the input.
 * @returns {string|number} The normalized value.
 */
function normalizeValue(type, value) {
  return NUMBER_FIELDS.has(type)
    ? Number(value)
    : value;
}

/**
 * Extracts and normalizes values from a collection of form input elements.
 * @param {Object.<string, HTMLInputElement|HTMLSelectElement>} inputs - Object containing input elements mapped by field name.
 * @returns {Object.<string, string|number>} Key-value pairs of clean, normalized form data.
 */
export function extractFormValues(inputs) {
  return Object.entries(inputs).reduce((values, [type, el]) => {
    const rawValue = el.value.trim();

    values[type] = normalizeValue(type, rawValue);

    return values;
  }, {});
}