import { createAdminClient } from '$lib/server/appwrite';

/** @type {import('./$types').PageLoad} */
export async function load(x) {
	const { databases } = createAdminClient();
  	const announcementsDBId = '68d64fbc0012a8ec7a92';
  	const announcementsPostId = '6925ecc600033d68ba2e';
  	const brokerDBId = '68d6504c001707f48230';
  	const brokerProfileId = '69262e00001b9f68d131';
	let data = await x.parent();
	let {isAuthenticated} = data;
	

	let announcementsPost = null;
	let brokersProfile = null;
  	let rand = (currentValue) => currentValue !== undefined ? +(Math.random() * currentValue).toFixed(2) : +(Math.random() * 3000).toFixed(2);
	

	try {
		// const newAPost = await databases.listDocuments(announcementsDBId, announcementsPostId);
		// announcementsPost = (newAPost.documents || []).map(x => {
		// 	x.uploadDate = new Date(x.uploadDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
		// 	return x;
		// });

		const newAPost = async () => {
			const result = await databases.listDocuments(announcementsDBId, announcementsPostId);
			return (result.documents || []).map(x => {
				x.uploadDate = new Date(x.uploadDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });				
				return x;
			});
		}
		announcementsPost = await newAPost();


		const brokersData = await databases.listDocuments(brokerDBId, brokerProfileId);
			brokersProfile = (brokersData.documents || []).map(x => {
				x.balance = rand();
				return x;
			});

	} catch (err) {
		console.error('Appwrite client error:', err);
	}
	

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
	
	let announcements = announcementsPost || [
		{
			bannerImage: {src:`./announcment-c/Announcement money.png`,bgColor:"#FFF3E0",bgPosition:"contain"},
			uploadDate: "3 Sep 2025",
			title: "Sign up with BUX and get €100 free for you to invest!",
			partner: "Bux",
			link: "/blog"
		},
		{
			bannerImage: {src:`./announcment-c/Teamwork-5--Streamline-Brooklyn (Traced) .png`,bgColor:"#f2eade",bgPosition:"contain"},
			uploadDate: "29 Aug 2024",
			title: "Refer a friend and get €20 EACH when they sign up!",
			partner: "Avatrade",
			link: "/blog"
		},
		{
			bannerImage: {src:`./announcment-c/Announcement Orange.png`,bgColor:"#ff6d3a",bgPosition:"contain"},
			uploadDate: "23 Aug 2024",
			title: "Investor Today has some new stocks for you!",
			partner: "Investor Today",
			link: "/blog"
		},
		{
			bannerImage: {src:`./home-page/homescreen-team.png`,bgColor:"white",bgPosition:"cover"},
			uploadDate: "Aug 29, 2023",
			title: "Are you saving enough?",
			partner: "Monytri",
			link: "/blog"
		},
		{
			bannerImage: {src:`./home-page/homescreen-team.png`,bgColor:"#E3F2FD",bgPosition:"cover"},
			uploadDate: "Aug 22, 2023",
			title: "Are you saving enough?",
			partner: "Monytri",
			link: "/blog"
		}
	];

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

	// Simulated portfolio value user data 
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
	} else {	return }

	portfolio.value = totalBalance + profitLoss;
	portfolio.profitLoss = profitLoss;
	portfolio.profitLossPercentage = +((portfolio.profitLoss / (portfolio.value - portfolio.profitLoss)) * 100).toFixed(2);	

    return {
		stockData: {  
			usersBrokers,
			totalBalance, 
			averageBalance,
			portfolio, 
			formData,
			announcements, 
		}

	};
};