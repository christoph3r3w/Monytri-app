<script>
    /** @type {import('./$types').PageProps} */
    import {PageStepContainer} from '$lib';
    let { data } = $props();
    let {device} = data;    
</script>

{#snippet a()}
    <!-- <div class="empty-inbox-announcement"> -->
        <div class="inbox-empty-icon">
            <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="47" cy="47" r="45" fill="#F9F7F4" stroke="#497951" stroke-width="4"/>
                <path d="M69.5 28.25H24.5C23.5054 28.25 22.5516 28.6451 21.8483 29.3483C21.1451 30.0516 20.75 31.0054 20.75 32V62C20.75 62.9946 21.1451 63.9484 21.8483 64.6516C22.5516 65.3549 23.5054 65.75 24.5 65.75H69.5C70.4946 65.75 71.4484 65.3549 72.1516 64.6516C72.8549 63.9484 73.25 62.9946 73.25 62V32C73.25 31.0054 72.8549 30.0516 72.1516 29.3483C71.4484 28.6451 70.4946 28.25 69.5 28.25ZM65.375 32L47 44.7125L28.625 32H65.375ZM24.5 62V33.7062L45.9313 48.5375C46.2451 48.7552 46.618 48.8719 47 48.8719C47.382 48.8719 47.7549 48.7552 48.0687 48.5375L69.5 33.7062V62H24.5Z" fill="#497951"/>
            </svg>
        </div>
        <div class="inbox-empty-text">
            <p>There are currently no messages to display.</p>
        </div>
    <!-- </div> -->
    
{/snippet}
<!-- headerName={device.isMobile? '' :'Inbox'} -->
<div class="inbox-container">
    <PageStepContainer 
        stepType=''
        headerName={''}
        subtext=""
        showLeftContent={true}
        showRightContent={true}
        showContinueButton={false}
        leftContent={''}
        rightContent={a}
    />
</div>

<style>

    .inbox-container {
        position: relative;
        grid-column: 1 / -1;
        grid-row: 1 / -1;
        width: 100%;
        display: grid;
        grid-template-columns: subgrid [left-start] repeat(5, [mid-left]) [left-end right-start] repeat(5, [mid-right]) [right-end];
        grid-template-rows: minmax(min-content, 4px) 1fr 1fr 3fr;
        height: calc(100cqh - var(--header-height) + var(--progressbar-height) + 10px);
        max-height: calc(100lvh + var(--footer-height) + var(--progressbar-height));
        background-color: var(--general-background-color);
        overflow-y: auto;
        container-type: normal;
        container-name: inbox-container;
    }

    :global(.mobile-step:has(.inbox-empty-text)){
        flex: 1; 
    }

    :global( .page-container:has(.inbox-empty-text) .right-step){
        grid-column: 1/-1;
        align-items: center;
        justify-content: flex-start;
    }

    .inbox-empty-icon{
        flex: 0 1 20%;;
        margin-top: 5cqh;
    }

    .inbox-empty-text{
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: var(--neutral-grey);
    }

    @media 
	(-webkit-min-device-pixel-ratio: 3),
	(-moz-min-device-pixel-ratio: 3),
	(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) ,
	screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait) , 
	screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)
	{

        :global( .page-container:has(.inbox-empty-text) .right-step){
            justify-content: center;
        }

        .inbox-empty-icon{
            flex: 0 1 20%;
            display: flex;
            justify-content: center;
            align-items: end;
        }     

        .inbox-empty-text{
            flex: 0 1 10%;
            display: flex;
            justify-content: center;
            align-items: top;
            text-align: center;
            padding: 2rem clamp(1rem,5vw ,25cqw);
        }  
    }


</style>