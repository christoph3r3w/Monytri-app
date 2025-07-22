# StepContainer Component System

## Overview

The `StepContainer_S.svelte` component is a flexible, reusable template system that uses Svelte snippets to render specific content for different step types in your gift flow. This system provides a consistent layout and behavior while allowing complete customization of content through snippets.

## Key Features

- **Snippet-based content rendering**: Use snippets to define specific content for left and right sections
- **Built-in step types**: Pre-configured layouts for common step types (recipient, amount, purpose, card-design, payment, review)
- **Flexible configuration**: Control visibility of sections, buttons, and behaviors
- **Accessibility**: Built-in keyboard navigation and screen reader support
- **Responsive design**: Mobile-optimized layouts
- **Consistent styling**: Shared button types and common UI elements

## Props

### Core Data
- `formData` - The main form data object containing all step information
- `currentStep` - Current step number (for validation and navigation)

### Navigation
- `nextStep` - Function to proceed to next step
- `previousStep` - Function to go back to previous step  
- `submitForm` - Function to submit the form (for final steps)

### Step Configuration
- `headerName` - Header text displayed in the step
- `stepType` - Predefined step type ('recipient', 'amount', 'purpose', 'card-design', 'payment', 'review', 'default')
- `stepValidation` - Object containing validation state for each step

### Layout Control
- `showLeftContent` - Show/hide left section (default: true)
- `showRightContent` - Show/hide right section (default: true)
- `showContinueButton` - Show/hide continue button (default: true)
- `showSkipButton` - Show/hide skip button (default: false)

### Component-specific Props
- `recipients` - Array of recipient objects (for recipient step)
- `min`, `max` - Min/max values (for amount step)
- `validateAmount`, `validatePurpose`, `validatePayment` - Validation functions

### Snippet Props
- `leftContent` - Custom snippet for left section content
- `rightContent` - Custom snippet for right section content
- `customButton` - Custom snippet for button area

## Pre-configured Step Types

### 1. Recipient Step (`stepType="recipient"`)
**Built-in features:**
- Search functionality with placeholder "Search Recipients"
- Error message display
- Left side instruction text

**Usage:**
```svelte
<StepContainer 
    {formData}
    headerName="Choose Recipient"
    stepType="recipient"
    {nextStep}
    {previousStep}
    {stepValidation}
    {recipients}
    rightContent={recipientsList}
/>
```

### 2. Amount Step (`stepType="amount"`)
**Built-in features:**
- Minimal left content (header only)
- Focus on right side content

**Usage:**
```svelte
<StepContainer 
    {formData}
    headerName="Select your gift amount"
    stepType="amount"
    {nextStep}
    {previousStep}
    {stepValidation}
    rightContent={amountForm}
/>
```

### 3. Purpose Step (`stepType="purpose"`)
**Built-in features:**
- Search functionality with placeholder "Search purpose"
- Skip button enabled by default
- Instruction text for occasion selection

**Usage:**
```svelte
<StepContainer 
    {formData}
    headerName="Choose a purpose"
    stepType="purpose"
    {nextStep}
    {previousStep}
    {stepValidation}
    showSkipButton={true}
    rightContent={purposeGrid}
/>
```

### 4. Payment/Review Steps (`stepType="payment"` or `stepType="review"`)
**Built-in features:**
- Submit button instead of continue button
- Payment confirmation layout

## Creating Custom Components

### Basic Structure

```svelte
<script>
    import StepContainer from '../Shared/StepContainer_S.svelte';
    
    let { formData, nextStep, previousStep, stepValidation } = $props();
    
    // Your component logic here
</script>

{#snippet yourCustomContent()}
    <!-- Your custom HTML here -->
{/snippet}

<StepContainer 
    {formData}
    headerName="Your Step Title"
    stepType="custom-type"
    {nextStep}
    {previousStep}
    {stepValidation}
    rightContent={yourCustomContent}
/>
```

### Example: Custom Amount Component

```svelte
<script>
    import StepContainer from '../Shared/StepContainer_S.svelte';
    
    let { formData, nextStep, previousStep, stepValidation, min = 1, max = 1000 } = $props();
    
    function handleRadioInput(value) {
        formData.amount = value;
        validateAmount();
    }
    
    function validateAmount() {
        const amount = parseFloat(formData.amount?.replace('€', '') || 0);
        stepValidation[2] = amount >= min && amount <= max;
    }
</script>

{#snippet amountForm()}
    <form onsubmit|preventDefault={nextStep}>
        <fieldset class="amount-options">
            {#each ['€25', '€50', '€100', '€500'] as amount}
                <label>
                    <input 
                        type="radio" 
                        name="fixedAmount" 
                        value={amount}
                        oninput={() => handleRadioInput(amount)}
                    >
                    {amount}
                </label>
            {/each}
        </fieldset>
        
        <fieldset class="custom-amount">
            <label for="amount">Or enter a custom amount</label>
            <input 
                type="number" 
                id="amount" 
                bind:value={formData.customAmount}
                min={min} 
                max={max}
                step="0.10"
            />
        </fieldset>
    </form>
{/snippet}

<StepContainer 
    {formData}
    headerName="Select your gift amount"
    stepType="amount"
    currentStep={2}
    {nextStep}
    {previousStep}
    {stepValidation}
    rightContent={amountForm}
/>

<style>
    /* Your custom styles here */
</style>
```

## Built-in Snippets

The StepContainer provides several built-in snippets you can use:

### Search Component
```svelte
{@render searchComponent('Search placeholder', formData.searchQuery)}
```

### Error Message
```svelte
{@render errorMessage(formData.errors?.[currentStep])}
```

### Button Types
```svelte
{@render buttonType('back')}
{@render buttonType('continue', currentStep)}
{@render buttonType('skip')}
{@render buttonType('submit')}
```

## Validation System

The validation system uses a `stepValidation` object where keys are step numbers and values are boolean validation states:

```javascript
stepValidation = {
    1: false, // Recipient not selected
    2: true,  // Amount is valid
    3: false, // Purpose not selected
    // etc.
}
```

Update validation in your component logic:
```javascript
function validateStep() {
    stepValidation[currentStep] = /* your validation logic */;
}
```

## Styling

The StepContainer includes comprehensive base styles for:
- Layout grid (responsive)
- Button styles
- Search inputs
- Error messages
- Mobile adaptations

You can override or extend these styles in your component:

```svelte
<style>
    :global(.step-container) {
        /* Override container styles */
    }
    
    .your-custom-class {
        /* Your component-specific styles */
    }
</style>
```

## Migration from Existing Components

To migrate existing components to use StepContainer:

1. **Extract content**: Move your main content into snippet functions
2. **Update props**: Use the new prop structure
3. **Remove duplicate layout**: Delete your existing step-container HTML
4. **Update styling**: Move component-specific styles to your component
5. **Test validation**: Ensure validation works with the new system

## Best Practices

1. **Keep snippets focused**: Each snippet should handle one specific piece of content
2. **Use built-in step types**: Leverage pre-configured types when possible
3. **Validate early**: Update validation state as soon as input changes
4. **Mobile-first**: Design your snippets with mobile in mind
5. **Accessibility**: Use semantic HTML and proper ARIA labels in your snippets
6. **Consistent naming**: Use clear, descriptive names for your snippet functions

This system provides maximum flexibility while maintaining consistency across your application. Each component can focus on its specific logic while the StepContainer handles the common layout and navigation patterns.
