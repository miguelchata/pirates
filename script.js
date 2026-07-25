// in Millions
const RESOURCES = {
	food: { quantity: 30, price: 350, compress: 1000},
	wood: { quantity: 5, price: 350, compress: 170},
	silver: { quantity: 1.25, price: 350, compress: 42},
}

const button = document.getElementById("button-calculate")

button.addEventListener('click', calculateResource);


function calculateResource(argument) {
	const goldInput = document.getElementById("gold")
	const goldValue = Number(goldInput.value)

	const foodInput = document.getElementById("food");
	const woodInput = document.getElementById("wood");
	const silverInput = document.getElementById("silver");

	const foodResult = document.getElementById("food-result")
	const woodResult = document.getElementById("wood-result")
	const silverResult = document.getElementById("silver-result")
	const goldResult = document.getElementById("gold-result")

	const foodValue = Number(foodInput.value);
	const woodValue = Number(woodInput.value);
	const silverValue = Number(silverInput.value);


	let totalGold = 0;

	// calculate foods
	let foodQuantity = foodValue * RESOURCES.food.quantity;
	let foodGoldCost = foodValue * RESOURCES.food.price;

	// calculate woods
	let woodQuantity = woodValue * RESOURCES.wood.quantity;
	let woodGoldCost = woodValue * RESOURCES.wood.price;

	// calculate silvers
	let silverQuantity = silverValue * RESOURCES.silver.quantity;
	let silverGoldCost = silverValue * RESOURCES.silver.price;

	totalGold = foodGoldCost + woodGoldCost + silverGoldCost;


	let foodCompressed = convertToCompressed(foodQuantity, RESOURCES.food.compress);
	let woodCompressed = convertToCompressed(woodQuantity, RESOURCES.wood.compress);
	let silverCompressed = convertToCompressed(silverQuantity, RESOURCES.silver.compress);

	goldResult.innerText = `Total Gold: ${convertBigNumber(totalGold)}`;
	foodResult.innerText = `Quantity: ${foodQuantity}M - Gold: ${convertBigNumber(foodGoldCost)} Compressed: ${foodCompressed}`;
	woodResult.innerText = `Quantity: ${woodQuantity}M - Gold: ${convertBigNumber(woodGoldCost)} Compressed: ${woodCompressed}`;
	silverResult.innerText = `Quantity: ${silverQuantity}M - Gold: ${convertBigNumber(silverGoldCost)} Compressed: ${silverCompressed}`;

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

	return `${resourceCompressed}/${resourceLeft}K`
}