import { createAdminClient } from '$lib/server/appwrite';

const BROKER_DB_ID = '68d6504c001707f48230';
const BROKER_PROFILE_ID = '69262e00001b9f68d131';

const cache = new Map();
const CACHE_TTL_MS = 60_000;

function distribute(arr, total) {
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
}

export async function getStockData({ cacheKey = 'global' } = {}) {
	const now = Date.now();
	const cached = cache.get(cacheKey);
	if (cached && cached.expiresAt > now) {
		return cached.value;
	}

	const { databases } = createAdminClient();

	let brokersProfile = null;
	const rand = (currentValue) =>
		currentValue !== undefined
			? +(Math.random() * currentValue).toFixed(2)
			: +(Math.random() * 3000).toFixed(2);

	try {
		const brokersData = await databases.listDocuments(BROKER_DB_ID, BROKER_PROFILE_ID);
		brokersProfile = (brokersData.documents || []).map((x) => {
			x.balance = rand();
			return x;
		});
	} catch (err) {
		console.error('Appwrite server error (brokers):', err);
	}

	let usersBrokers = brokersProfile || [
		{ name: 'eToro', logo: '', link: '', balance: 0 },
		{ name: 'Robinhood', logo: '', link: '', balance: 0 },
		{ name: 'Interactive Brokers', logo: '/brokers/Interactive Brokers logo 2..png', link: '', balance: 0 }
	];

	let totalBalance = usersBrokers.reduce((acc, broker) => acc + broker.balance, 0);
	let averageBalance = usersBrokers.length ? totalBalance / usersBrokers.length : 0;
	const profitLoss = +(Math.random() * 200 - 100).toFixed(2);

	if (usersBrokers && usersBrokers.length > 0) {
		usersBrokers = distribute(usersBrokers, totalBalance);
		totalBalance = usersBrokers.reduce((a, b) => a + b.balance, 0);
		averageBalance = usersBrokers.length ? totalBalance / usersBrokers.length : 0;
	}

	const portfolio = {
		value: totalBalance + profitLoss,
		profitLoss,
		profitLossPercentage:
			totalBalance - profitLoss !== 0
				? +((profitLoss / (totalBalance - profitLoss)) * 100).toFixed(2)
				: 0
	};

	const value = {
		stockData: {
			usersBrokers,
			totalBalance,
			averageBalance,
			portfolio
		}
	};

	cache.set(cacheKey, { expiresAt: now + CACHE_TTL_MS, value });
	return value;
}
