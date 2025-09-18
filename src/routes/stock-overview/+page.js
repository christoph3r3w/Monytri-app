import { user } from '$lib/user';

/** @type {import('./$types').PageLoad} */
export async function load() {
	let rand = (currentValue) => currentValue !== undefined ? +(Math.random() * currentValue).toFixed(2) : +(Math.random() * 1000).toFixed(2);

    let formData = {
		benefactor: null,
		requestId: null,
		cardDesign: 'default',
		Purpose: null,
		DeliveryDate: null,
		requestMethod: null,
		amount: null,
		message: 'check if needed',
		searchQuery: '',
		errors: {},
		isLoading: false,
		date: new Date(),
		get currentDate() {	return this.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });},
		expiresAt: null,
		shareUrl: null,
		token: null
	};
	
	let announcements = [
		{
			img: {src:`/announcment-c/Announcement money.png`,bgColor:"#FFF3E0",bgPosition:"contain"},
			date: "1 Sep 2025",
			title: "Sign up with BUX and get €100 free for you to invest!",
			partner: "Bux",
			link: "/blog"
		},
		{
			img: {src:`/announcment-c/Teamwork-5--Streamline-Brooklyn (Traced) .png`,bgColor:"#f2eade",bgPosition:"contain"},
			date: "29 Aug 2024",
			title: "Refer a friend and get €20 EACH when they sign up!",
			partner: "Avatrade",
			link: "/blog"
		},
		{
			img: {src:`/announcment-c/Announcement Orange.png`,bgColor:"#ff6d3a",bgPosition:"contain"},
			date: "23 Aug 2024",
			title: "Investor Today has some new stocks for you!",
			partner: "Investor Today",
			link: "/blog"
		},
		{
			img: {src:`/home-page/homescreen-team.png`,bgColor:"white",bgPosition:"cover"},
			date: "Aug 20, 2023",
			title: "Are you saving enough?",
			partner: "Monytri",
			link: "/blog"
		},
		{
			img: {src:`/home-page/homescreen-team.png`,bgColor:"#E3F2FD",bgPosition:"cover"},
			date: "Aug 20, 2023",
			title: "Are you saving enough?",
			partner: "Monytri",
			link: "/blog"
		}
	];

	let brokers = [
		{
			name: "eToro",
			logo: "",
			link: "https://www.etoro.com/",
			description:
				"eToro is a social trading and multi-asset brokerage company that focuses on providing financial and copy trading services.",
			balance: rand()
		},
		{
			name: "Robinhood",
			logo: "",
			link: "https://robinhood.com/",
			description:
				"Robinhood offers commission-free trading of stocks, ETFs, and cryptocurrencies via a mobile-first platform.",
			balance: rand()
		},
		{
			name: "Fidelity",
			logo: "",
			link: "https://www.fidelity.com/",
			description:
				"Fidelity provides investment management, retirement planning, brokerage, and other financial services.",
			balance: rand()
		},
		{
			name: "Getbux",
			logo: "/brokers/BUX brokers logo 10.png",
			link: "https://www.getbucks.com/",
			description:
				"Getbucks offers accessible financial services and lending products in selected markets.",
			balance: rand()
		},
		{
			name: "Degiro",
			logo: "/brokers/Degiro broker logo.png",
			link: "https://www.dejiro.com/",
			description:
				"Dejiro provides a straightforward platform for trading global equities and ETFs.",
			balance: rand()
		},
		{
			name: "Interactive Brokers",
			logo: "/brokers/Interactive Brokers logo..png",
			link: "https://www.interactivebrokers.com/",
			description:
				"Interactive Brokers offers a professional-grade platform with global market access and advanced trading tools.",
			balance: rand()
		},
	];

	let usersBrokers = [
		// {name: "eToro",logo: "",link:"" , balance: 0},
		// {name: "Robinhood",logo: "",link:"" , balance: 0},
		// {name: "Interactive Brokers",logo: "/brokers/Interactive Brokers logo 2..png",link:"" , balance: 0}
	];


	let totalBalance = brokers.reduce((acc, broker) => acc + broker.balance, 0);
	let averageBalance = totalBalance / brokers.length;
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
	} else if (brokers && brokers.length > 0) {
		brokers = distribute(brokers, totalBalance);
		totalBalance = brokers.reduce((a, b) => a + b.balance, 0);
		averageBalance = totalBalance / brokers.length;
		// update portfolio object
	}

	portfolio.value = totalBalance + profitLoss;
	portfolio.profitLoss = profitLoss;
	portfolio.profitLossPercentage = +((portfolio.profitLoss / (portfolio.value - portfolio.profitLoss)) * 100).toFixed(2);


    return {
		data: { 
			brokers, 
			usersBrokers,
			totalBalance, 
			averageBalance,
			portfolio, 
			formData,
			announcements, 
		}

	};
};