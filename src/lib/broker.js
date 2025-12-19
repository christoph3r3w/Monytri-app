import {databases} from '$lib/appwrite';

/** @type {import('./$types').PageLoad} */
export async function load() {
  	const brokerDBId = '68d6504c001707f48230';
  	const brokerProfileId = '69262e00001b9f68d131';

	let brokersProfile = null;
  	let rand = (currentValue) => currentValue !== undefined ? +(Math.random() * currentValue).toFixed(2) : +(Math.random() * 3000).toFixed(2);

	try {
		const brokersData = await databases.listDocuments(brokerDBId, brokerProfileId);
		brokersProfile = (brokersData.documents || []).map(x => {
			x.balance = rand();
			return x;
		});
	} catch (err) {
		console.error('Appwrite client error:', err);
	}

	let usersBrokers = brokersProfile || [
		{name: "eToro",logo: "",link:"" , balance: 0},
		{name: "Robinhood",logo: "",link:"" , balance: 0},
		{name: "Interactive Brokers",logo: "/brokers/Interactive Brokers logo 2..png",link:"" , balance: 0}
	];

	let totalBalance = usersBrokers.reduce((acc, broker) => acc + broker.balance, 0);
	let averageBalance = totalBalance / usersBrokers.length;
	let profitLoss = +(Math.random() * 200 - 100).toFixed(2); // Random P/L between -100 and +100
	let portfolio =  {
		value: '',
		profitLoss:'',
		// The + turns this calculation into a number type.
		profitLossPercentage: +((profitLoss / (totalBalance - profitLoss)) * 100).toFixed(2)
	};

	// Simulate user data (I do not understand this yet. So come back and analyze this.)
	// If usersBrokers is provided, update its balances
	const distribute = (arr, total) => {
		if (!arr.length) return arr;
		const weights = arr.map(() => Math.random());
		const weightSum = weights.reduce((a, b) => a + b, 0);
		let running = 0;
		return arr.map((b, i) => {
			if (i === arr.length - 1) {
				const amount = +(total - running).toFixed(2);
				return { ...b, balance: amount };
			}
			const amount = +(total * (weights[i] / weightSum)).toFixed(2);
			running += amount;
			return { ...b, balance: amount };
		});
	};

	if (usersBrokers && usersBrokers.length > 0) {
		usersBrokers = distribute(usersBrokers, totalBalance);
		totalBalance = usersBrokers.reduce((a, b) => a + b.balance, 0);
		averageBalance = totalBalance / usersBrokers.length;
		// update portfolio object
	} else {	return {
		usersBrokers: [],
		totalBalance: 0,
		averageBalance: 0,
		portfolio: { value: 0, profitLoss: 0, profitLossPercentage: 0 }
		}
	}

	portfolio.value = totalBalance + profitLoss;
	portfolio.profitLoss = profitLoss;
	portfolio.profitLossPercentage = +((portfolio.profitLoss / (portfolio.value - portfolio.profitLoss)) * 100).toFixed(2);
		

	return {
		stockData: {  
			usersBrokers,
			totalBalance, 
			averageBalance,
			portfolio, 
		}
	};
}