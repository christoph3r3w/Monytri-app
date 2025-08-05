<!-- Enhanced StepContainer Usage Example -->

<!-- OPTION 1: Full Internal Management -->
<!-- The StepContainer manages everything internally -->
<StepContainer 
	{formData}
	headerName="Choose a purpose"
	stepType="purpose"
	bind:currentStep
	bind:stepValidation
	totalSteps={5}
	onStepChange={(newStep, oldStep) => {
		console.log(`Step changed from ${oldStep} to ${newStep}`);
	}}
	showSkipButton={true}
	rightContent={purposeOptions}
/>

<!-- OPTION 2: Hybrid Approach (Backward Compatible) -->
<!-- Uses internal management but allows external override -->
<StepContainer 
	{formData}
	headerName="Choose a purpose" 
	stepType="purpose"
	bind:currentStep
	bind:stepValidation
	totalSteps={5}
	nextStep={customNextStep}  // Optional external function
	previousStep={customPreviousStep}  // Optional external function
	showSkipButton={true}
	rightContent={purposeOptions}
/>

<!-- OPTION 3: External Management (Current Approach) -->
<!-- Fully external step management - no changes needed -->
<StepContainer 
	{formData}
	headerName="Choose a purpose"
	stepType="purpose"
	currentStep={3}
	{nextStep}
	{previousStep}
	{stepValidation}
	showSkipButton={true}
	rightContent={purposeOptions}
/>
