import { goto } from '$app/navigation';
import {current, isMobile} from '$lib/store.js';

// State management
export let currentStep = $state(1);
export let totalSteps = $state(5);

// Form data structure
export let formData = $state({
	recipient: null,
	cardDesign: 'default',
	Purpose: null,
	DeliveryDate: null,
	PaymentMethod: null,
	amount: null,
	message: '',
	searchQuery: '',
	errors: {},
	isLoading: false,
	date: new Date(),
	currentDate: null
});

formData.currentDate = formData.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });

// Step validation state
export let stepValidation = $state({
	1: false,
	2: false,
	3: false,
	4: false,
	5: true, // Review step is always valid
});

// Use provided recipients or fallback to defaults
export let recipients = $state([
	{
	id: 1,
	name: 'James May',
	email: 'jamesmay123@gmail.com',
	lastSent: '12 Aug 2024',
	profilePic: './generic.png',
	linkedCard: 'ambro-bro1',
	amountMax: 100000,
	amountMin: 0,
	},
	{
	id: 2,
	name: 'Richard Hammond',
	email: 'richardhammond@gmail.com',
	lastSent: '10 Aug 2024',
	profilePic: '/generic 2.png',
	linkedCard: 'card-1234',
	amountMax: 100000,
	amountMin: 0,
	},
	{
	id: 3,
	name: 'Jeremy Clarkson',
	email: 'jeremyclarkson@gmail.com',
	lastSent: '15 Aug 2024',
	profilePic: '',
	linkedCard: null,
	amountMax: 4000,
	amountMin: 0,
	},
	{
	id: 4,
	name: 'James June',
	email: 'jamesmay123@gmail.com',
	lastSent: '12 Aug 2024',
	profilePic: '/generic.png',
	linkedCard: 'ambro-bro2',
	amountMax: 1000,
	amountMin: 0,
	},
	{
	id: 5,
	name: 'Richard Hammond',
	email: 'richardhammond@gmail.com',
	lastSent: '10 Aug 2024',
	profilePic: '',
	linkedCard: 'card-4334',
	amountMax: 50000,
	amountMin: 0,
	},
	{
	id: 6,
	name: 'Jeremy Clarkson',
	email: 'jeremyclarkson@gmail.com',
	lastSent: '15 Aug 2024',
	profilePic: '/generic 2.png',
	linkedCard: null,
	amountMax: 10,
	amountMin: 0,
	}
]);

// Progress tracking
export let currentProgress = $state(0);
export let progressPercentage = $derived(currentProgress > 0 ? currentProgress : ((currentStep / totalSteps) - (1 / totalSteps)) * 100);

// Error handling function
export function handleError(step, error) {
	formData.errors[step] = error;
	setTimeout(() => {
		delete formData.errors[step];
	}, 3000); // Clear error after 3 seconds
}

// Search recipient functionality
export function searchRecipients(query) {
	formData.searchQuery = query;
	return recipients.filter(recipient => 
		recipient.name.toLowerCase().includes(query.toLowerCase()) ||
		recipient.email.toLowerCase().includes(query.toLowerCase())
	);
}

// Enhanced validation functions
export function selectRecipient(recipient) {
	if (!recipient) {
		handleError(1, 'Please select a recipient');
		return;
	}
	formData.recipient = recipient;
	stepValidation[1] = true;
}

export function nextStep() {
	if (stepValidation[currentStep] && currentStep < totalSteps) {
		currentStep++;
	}
}

export function previousStep() {
	if (currentStep > 1) {
		currentStep--;
	}
}

export function validateAmount(e) {
	let finalAmount;

	if (e.target.type === 'radio') {
		const customAmountInput = document.getElementById('amount');
		if (customAmountInput) {
			customAmountInput.value = ''; // Clear custom input when radio is selected
		}
		formData.amount = e.target.id;
		finalAmount = parseFloat(e.target.value.replace('€', ''));
	} else if (e.target.type === 'number') {
		const radioButtons = document.querySelectorAll('input[name="fixedAmount"]');
		radioButtons.forEach((radio) => (radio.checked = false)); // Clear radio selections
		formData.amount = 'amount';
		finalAmount = parseFloat(e.target.value);
	} else {
		formData.amount = 'amount';
		finalAmount = parseFloat(e.target.value);

		const radioButtons = document.querySelectorAll('input[name="fixedAmount"]');
		radioButtons.forEach((radio) => (radio.checked = false));
	}

	if (finalAmount < formData.recipient.amountMin  || isNaN(finalAmount) || finalAmount > formData.recipient.amountMax) {
		handleError(2, 'Please enter an amount between €10 and €100');
		finalAmount = 0;
		stepValidation[2] = false;
		formData.amount = null;
		return;
	}

	formData.amount = finalAmount;
	stepValidation[2] = true;
}

export function validatePurpose() {
	if (!formData.Purpose) {
		handleError(3, 'Please select a purpose');
		return;
	}
	stepValidation[3] = true;
}

//search purpose functionality
export function searchPurpose(query) {
	formData.searchQuery = query;
	return formData.Purpose.filter(purpose => 
		purpose.toLowerCase().includes(query.toLowerCase())
	);
}

export function validateCardDesign(cardDesignId) {
	if (!cardDesignId || cardDesignId === 'default') {
		handleError(4, 'Please select a card design');
		return;
	}
	formData.cardDesign = cardDesignId;
	stepValidation[4] = true;
}

export function validatePayment(e) {
	stepValidation[5] = e.target.value && formData.PaymentMethod !== null;
}

export async function submitForm() {
	formData.isLoading = true;

	try {
		if (!formData.PaymentMethod) {
			alert('Please select a payment method')
			throw new Error('Please select a payment method');
		}

		if (!formData.recipient) {
			alert('Please select a recipient')
			throw new Error('Please select a recipient');
		}

		currentProgress = 100;

		await new Promise(resolve => setTimeout(resolve, 1000));
		// alertDialog.remove();
		// Store form data in localStorage before redirecting
		// localStorage.setItem('giftFormData', JSON.stringify(formData));
		localStorage.setItem('giftFormData', 'hi');

		await goto('/gift-success');

	} catch (error) {
		handleError(5, error.message);
	} finally {
		formData.isLoading = false;
	}
}

export function resetFormDataEffect() {
	// Reset form data when the component is destroyed
	return () => {
		formData.recipient = null;
		formData.amount = null;
		formData.cardDesign = 'default';
		formData.Purpose = null;
		formData.DeliveryDate = null;
		formData.amount = null;
		formData.message = '';
	};
}
// ... end of file ...
