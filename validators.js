export const validatros = {
	number: (value, rule) => {
		if (typeof value !== "number" || Number.isNaN(value)) {
			return "Must be a number";
		}
	}
}