export const prerender = false;

export const load = ({ fetch, params }) => {

	let formData = {
		amount: null,
		message: 'check if needed',
		searchQuery:'',
		errors: {},
		isLoading: false,
		date: new Date(),
		get currentDate() {	return this.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });},
		expiresAt: null,
		shareUrl: null,
		token: null
	};

	const transactionData = [
		{ id:1, transactionType: 'sent', user:{name:'Dani',surname:'dune'}, amount: 21.10, slug:'tx-1-dani', date: '2024-10-01', status: 'completed' },
		{ id:2, transactionType: 'received', user:{name:'David',surname:'Dick'}, amount: 125, slug:'2dd-r', date: '2024-10-02', status: 'pending' },
		{ id:3, transactionType: 'received', user:{name:'Chiara',surname:'Liqui Lung'}, amount: '45', slug:'3cl-r', date: '2024-10-03', status: 'pending' },
		{ id:4, transactionType: 'received', user:{name:'Christopher',surname:'Willems'}, amount: '150', slug:'4cw-s', date: '2024-10-04', status: 'completed' },
		{ id:5, transactionType: 'received', user:{name:'Jamila',surname:'Jones'}, amount: '60', slug:'5jj-r', date: '2024-10-05', status: 'completed' },
		{ id:6, transactionType: 'sent', user:{name:'Karnis',surname:'Jansen'}, amount: '175', slug:'6kj-s', date: '2024-10-06', status: 'pending' },
		{ id:7, transactionType: 'received', user:{name:'Maria',surname:'Martina'}, amount: '40', slug:'7mm-r', date: '2024-10-07', status: 'completed' },
		{ id:8, transactionType: 'sent', user:{name:'Amy',surname:'Frost'}, amount: '195', slug:'8af-s', date: '2024-10-08', status: 'completed' },
		{ id:9, transactionType: 'received', user:{name:'Jeremy',surname:'Clarkson'}, amount: '180', slug:'9jc-r', date: '2024-10-09', status: 'pending' },
		{ id:10, transactionType: 'sent', user:{name:'David',surname:'Dick'}, amount: 140.70, slug:'10dd-s', date: '2024-10-10', status: 'completed' },
		{ id:11, transactionType: 'received', user:{name:'Chiara',surname:'Liqui Lung'}, amount: '85', slug:'11cl-r', date: '2024-10-11', status: 'completed' },
		{ id:12, transactionType: 'sent', user:{name:'Christopher',surname:'Willems'}, amount: '100', slug:'12cw-s', date: '2024-10-12', status: 'failed' },
		{ id:13, transactionType: 'sent', user:{name:'Amy',surname:'Frost'}, amount: '1.90', slug:'13af-r', date: '2024-10-13', status: 'completed' },
		{ id:14, transactionType: 'sent', user:{name:'Maria',surname:'Martina'}, amount: '120', slug:'14mm-s', date: '2024-10-14', status: 'pending' }
	];

	// Filter the data based on the slug parameter
	const filteredData = transactionData.filter(tx => tx.slug === params.slug)[0];

	function formatCurrency(value) {
		const number = typeof value === 'string' ? parseFloat(value) : value;
		return new Intl.NumberFormat('en-IE', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(number);
	}

	filteredData.amount = formatCurrency(filteredData.amount);

	return {
		// Return the filtered transaction data
		slug: {TDU: filteredData, formData}
	};
}

