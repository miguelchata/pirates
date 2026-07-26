const calcButton = document.getElementById("button-calculate");

calcButton.addEventListener('click', clickHandler);

const RESOURCES = Object.freeze({
	food: { quantity: 30, price: 350, compressionRate: 1000},
	wood: { quantity: 5, price: 350, compressionRate: 170},
	silver: { quantity: 1.25, price: 350, compressionRate: 42},
	gold: { quantity: 0, price: 0, compressionRate: 0 },
});

const UI = collectUI();

function clickHandler() {
	clearUI();
	const values = collectValues();

	const { data, errors } = calculateResource(values);

	renderErrors(errors);
	renderResults(data);
}

function collectUI() {
	let elements = {};

	for (const key of Object.keys(RESOURCES)) {
		elements[key] = document.getElementById(key);
		elements[`${key}-result`] = document.getElementById(`${key}-result`);
		elements[`${key}-error`] = document.getElementById(`${key}-error`);
	}

	return elements;
}

function collectValues() {
	let values = {};

	for (let input of Object.keys(RESOURCES)) {
		values[input] = UI[input].value;
	}

	return values;
}


function calculateResource(values) {
	let result = {
		data: {},
		errors: [],
	};

	for (const [key, value] of Object.entries(RESOURCES)) {
		const inputValue = Number(values[key])

		if (!Number.isNaN(inputValue) && Number.isFinite(inputValue) && inputValue > 0) {
			const amount = inputValue * value.quantity;
			const gold = inputValue * value.price;
			const compress = convertToCompressed(amount, value.compressionRate); 

			result.data[key] = { amount, gold, compress };
		} else {
			result.errors.push(key);
		}

	}

	return result;
}

function clearUI() {
	for (const key of Object.keys(RESOURCES)) {
		UI[`${key}-result`].innerText = "";
		UI[`${key}-error`].innerText = "";
	}
}

function renderErrors(errors) {
	for (let error of errors ) {
		UI[`${error}-error`].innerText = "Input should be a number and greater than zero!";
	}
}

function renderResults(results) {
	let totalGold = 0;

	for (const [key, value] of Object.entries(results)) {
		UI[`${key}-result`].innerText = `Amount: ${value.amount}M - Gold: ${convertBigNumber(value.gold)} Compressed: ${value.compress}`;
		totalGold += value.gold;
	}

	UI[`gold-result`].innerText = `Total Gold: ${convertBigNumber(totalGold)}`;
}


function convertBigNumber(gold) {
	let goldThousand = gold % 1000;
	let goldMillion = (gold - goldThousand) / 1000;

	let stringMillion = ''
	let stringThousand = ''

	if (goldMillion > 0) 
		stringMillion += `${goldMillion}M`

	if (goldThousand > 0)
		stringThousand +=  `${goldThousand}K`

	return `${stringMillion} - ${stringThousand}`
}

function convertToCompressed(resource, rate) {
	let resourceLeft = (resource * 1000) % rate;
	let resourceCompressed = ((resource * 1000 ) - resourceLeft) / rate;

	return `${resourceCompressed}units / ${resourceLeft}K`
}