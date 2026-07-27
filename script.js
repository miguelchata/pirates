// ui.js
const calcButton = document.getElementById("button-calculate");

calcButton.addEventListener('click', handleCalculateClick);

const uiIds = Object.freeze({
	food: {
		input: 'food-input',
		result: 'food-result',
		error: 'food-error',
	},
	wood: {
		input: 'wood-input',
		result: 'wood-result',
		error: 'wood-error',
	},
	silver: {
		input: 'silver-input',
		result: 'silver-result',
		error: 'silver-error',
	},
	gold: {
		input: 'gold-input',
		result: 'gold-result',
		error: 'gold-error',
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
	for (const error of errors ) {
		const resource = uiIds[error];

		ui[resource.error].innerText = "Input should be a number and greater than zero!";
	}
}

function renderResults(results) {
	let totalGold = 0;

	for (const [key, value] of Object.entries(results)) {
		const resourceUI = uiIds[key];

		ui[resourceUI.result].innerText = `Amount: ${value.amount}M - Gold: ${formatLargeNumber(value.gold)} Compressed: ${value.compress}`;
		totalGold += value.gold;
	}

	ui[uiIds.gold.result].innerText = `Total Gold: ${formatLargeNumber(totalGold)}`;
}

function formatLargeNumber(gold) {
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

// script.js
const RESOURCES = Object.freeze({
	food: {
		quantity: 30,
		price: 350,
		compressionRate: 1000,
	},
	wood: {
		quantity: 5,
		price: 350,
		compressionRate: 170,
	},
	silver: {
		quantity: 1.25,
		price: 350,
		compressionRate: 42,
	},
});

function calculateResources(values) {
	const data = {};
	const errors = [];

	for (const [key, value] of Object.entries(RESOURCES)) {
		const inputValue = values[key]

		if (isValidResourceAmount(inputValue)) {
			const amount = inputValue * value.quantity;
			const gold = inputValue * value.price;
			const compress = convertToCompressed(amount, value.compressionRate); 

			data[key] = { amount, gold, compress };
		} else {
			errors.push(key);
		}

	}

	return { data, errors };
}

function convertToCompressed(resource, rate) {
	const resourceLeft = (resource * 1000) % rate;
	const resourceCompressed = ((resource * 1000 ) - resourceLeft) / rate;

	return `${resourceCompressed} units / ${resourceLeft}K`
}

function isValidResourceAmount(amount) {

	return (Number.isFinite(amount) && amount > 0);
}