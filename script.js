const RESOURCES = {
	food: { amount: 0, gold: 0, compress: '', quantity: 30, price: 350, one: 1000},
	wood: { amount: 0, gold: 0, compress: '', quantity: 5, price: 350, one: 170},
	silver: { amount: 0, gold: 0, compress: '', quantity: 1.25, price: 350, one: 42},
}

const UI = {
	calcButton: document.getElementById("button-calculate"),
	goldInput: document.getElementById("gold"),
	foodInput: document.getElementById("food"),
	woodInput: document.getElementById("wood"),
	silverInput: document.getElementById("silver"),
	foodResult: document.getElementById("food-result"),
	woodResult: document.getElementById("wood-result"),
	silverResult: document.getElementById("silver-result"),
	goldResult: document.getElementById("gold-result"),
}

UI.calcButton.addEventListener('click', calculateResource);


function calculateResource() {
	const goldValue = Number(UI.goldInput.value)

	for (const [key, value] of Object.entries(RESOURCES)) {
		const inputValue = Number(UI[`${key}Input`].value)

		RESOURCES[key].amount = inputValue * RESOURCES[key].quantity;
		RESOURCES[key].gold = inputValue * RESOURCES[key].price;
		RESOURCES[key].compress = convertToCompressed(RESOURCES[key].amount, RESOURCES[key].one);

	}

	renderResults();
}

function renderResults() {
	let totalGold = 0;

	for (const [key, value] of Object.entries(RESOURCES)) {
		UI[`${key}Result`].innerText = `Amount: ${value.amount}M - Gold: ${convertBigNumber(value.gold)} Compressed: ${value.compress}`;
		totalGold += value.gold;
	}

	UI.goldResult.innerText = `Total Gold: ${convertBigNumber(totalGold)}`;
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