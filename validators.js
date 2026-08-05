export const validatros = {
	number: (value, rule) => {
		if (typeof value !== "number" || Number.isNaN(value)) {
			return "Must be a number";
		}
	},
	string: (value, ruel) => {
		if (typeof value !== "string") {
			return "Must be a valid string.";
		}
	}
}