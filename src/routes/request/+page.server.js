/** @type {import('./$types').PageServerLoad} */
export async function load() {
// Form data structure
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

	// Use provided benefactors or fallback to defaults
	let benefactors = [
		{
		id: 999,
		name: 'Open request',
		profilePic: '/shared-assests/banner-deco2.avif'
		},
		{
		id: 1,
		name: 'David Dick',
		email: 'david.dick@artgallery.com',
		lastSent: '2 days ago',
		profilePic: ''
		},
		{
		id: 2,
		name: 'Chiara Liqui Lung',
		email: 'chiara.chef@culinaryarts.it',
		lastSent: '1 week ago',
		profilePic: ''
		},
		{
		id: 3,
		name: 'Christopher Willems',
		email: 'chris.crypto@blockchain.tech',
		lastSent: '3 days ago',
		profilePic: ''
		},
		{
		id: 4,
		name: 'Jamila Jones',
		email: 'jamila.books@literature.org',
		lastSent: '5 days ago',
		profilePic: ''
		},
		{
		id: 5,
		name: 'Karnis Jansen',
		email: 'karnis.music@symphony.nl',
		lastSent: '2 weeks ago',
		profilePic: ''
		},
		{
		id: 7,
		name: 'Maria Martina',
		email: 'maria.fitness@healthclub.es',
		lastSent: '1 day ago',
		profilePic: ''
		},
		{
		id: 8,
		name: 'Amy Frost',
		email: 'amy.travel@wanderlust.com',
		lastSent: '15 Aug 2024',
		profilePic: ''
		},
		{
		id: 9,
		name: 'Jeremy Clarkson',
		email: 'jeremy.cars@topgear.uk',
		lastSent: '15 Aug 2024',
		profilePic: '/generic 2.avif'
		}
	];


    return {
        benefactors,
        formData
    }
};