<script>
	import { onMount } from "svelte";
	import { goto } from '$app/navigation';

	let Invested = $state(1500.75); // Example invested amount, replace with actual data source
	let Gifted = $state(500.25); // Example gifted amount, replace with actual data source
	
	let investedRaw = 1500.75;
	let giftedRaw = 500.25;

	function balanceString(balance) {
		const formatted = new Intl.NumberFormat('nl-NL', {
			style: 'currency',
			currency: 'EUR',
		}).format(balance);
		const maxLength = 10;
		return formatted.length > maxLength ? formatted.slice(0, maxLength) + '…' : formatted;
	}

	Invested = balanceString(investedRaw);
	Gifted = balanceString(giftedRaw);

</script>

{#snippet balance()}
	<article class="balance-info">
		<div class="gifted">
			<h1 title={undefined}>{Gifted}</h1>
			<p>You have gifted</p>
		</div>
		<div class="invested ">
			<h1 title={undefined}>{Invested}</h1>
			<p>Portfolio Value</p>
		</div>
	</article>
	<a href="/" class="add-money-link">
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.83333 7.33333C6.83333 8.52667 7.80667 9.5 9 9.5H12V10C12 11.3333 11.3333 12 10 12H2C0.666667 12 0 11.3333 0 10V1.33333C0 2.06667 0.6 2.66667 1.33333 2.66667H10C11.3333 2.66667 12 3.33333 12 4.66667V5.16667H9C7.80667 5.16667 6.83333 6.14 6.83333 7.33333ZM9 6.16667C8.36 6.16667 7.83333 6.69333 7.83333 7.33333C7.83333 7.97333 8.36 8.5 9 8.5H12V6.16667H9ZM9.34668 8C8.98001 8 8.67334 7.7 8.67334 7.33333C8.67334 6.96667 8.97334 6.66667 9.34001 6.66667H9.34668C9.71335 6.66667 10.0133 6.96667 10.0133 7.33333C10.0133 7.7 9.71335 8 9.34668 8ZM8 0H1.83333C1.37333 0 1 0.373333 1 0.833333C1 1.29333 1.37333 1.66667 1.83333 1.66667H9.97998C9.87998 0.553333 9.22 0 8 0Z" fill="white"/>
		</svg>
  		Add Money
	</a>

{/snippet}

{#snippet landingInfo()}
		<article class="balance-info">
			<div class="invested ">
				<h1 title={undefined}>{Invested}</h1>
				<p>Portfolio Value</p>
			</div>
			<a href="/" class="add-money-link">
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6.83333 7.33333C6.83333 8.52667 7.80667 9.5 9 9.5H12V10C12 11.3333 11.3333 12 10 12H2C0.666667 12 0 11.3333 0 10V1.33333C0 2.06667 0.6 2.66667 1.33333 2.66667H10C11.3333 2.66667 12 3.33333 12 4.66667V5.16667H9C7.80667 5.16667 6.83333 6.14 6.83333 7.33333ZM9 6.16667C8.36 6.16667 7.83333 6.69333 7.83333 7.33333C7.83333 7.97333 8.36 8.5 9 8.5H12V6.16667H9ZM9.34668 8C8.98001 8 8.67334 7.7 8.67334 7.33333C8.67334 6.96667 8.97334 6.66667 9.34001 6.66667H9.34668C9.71335 6.66667 10.0133 6.96667 10.0133 7.33333C10.0133 7.7 9.71335 8 9.34668 8ZM8 0H1.83333C1.37333 0 1 0.373333 1 0.833333C1 1.29333 1.37333 1.66667 1.83333 1.66667H9.97998C9.87998 0.553333 9.22 0 8 0Z" fill="white"/>
				</svg>
				Add Money
			</a>
		</article>
		<div class="gifted outer">
				{#if Gifted.length > 0 && Invested.length > 0}
					<span class="gifted-content">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.321 6.42505L17.236 4.90002C17.564 4.35202 17.572 3.69296 17.257 3.13696C16.942 2.58096 16.373 2.25 15.735 2.25H8.26501C7.62601 2.25 7.05701 2.58196 6.74301 3.13696C6.42901 3.69296 6.43601 4.35202 6.76501 4.90002L7.67899 6.42505C4.73999 9.13705 3.25 12.019 3.25 15C3.25 16.583 3.881 21.75 12 21.75C20.119 21.75 20.75 16.583 20.75 15C20.75 12.019 19.261 9.13705 16.321 6.42505ZM8.048 3.87598C8.075 3.82898 8.13901 3.75 8.26501 3.75H15.735C15.861 3.75 15.925 3.82998 15.952 3.87598C15.979 3.92298 16.014 4.02005 15.949 4.12805L14.935 5.81897H9.065L8.05099 4.12805C7.98599 4.02005 8.021 3.92398 8.048 3.87598ZM12 20.25C5.457 20.25 4.75 16.579 4.75 15C4.75 12.382 6.165 9.79995 8.935 7.31995H15.065C17.836 9.79995 19.25 12.382 19.25 15C19.25 16.579 18.543 20.25 12 20.25ZM12.818 13.433L11.553 13.114C11.393 13.072 11.257 12.982 11.153 12.847C11.054 12.72 11 12.556 11 12.387C11 11.974 11.325 11.639 11.725 11.639H12.276C12.645 11.639 12.954 11.9251 12.996 12.3051C13.041 12.7171 13.406 13.011 13.824 12.968C14.236 12.923 14.532 12.551 14.487 12.14C14.379 11.163 13.665 10.3969 12.75 10.1949V10C12.75 9.586 12.414 9.25 12 9.25C11.586 9.25 11.25 9.586 11.25 10V10.193C10.251 10.414 9.5 11.312 9.5 12.387C9.5 12.888 9.66699 13.378 9.96399 13.762C10.265 14.157 10.696 14.442 11.182 14.567L12.447 14.886C12.773 14.97 13 15.269 13 15.613C13 15.813 12.923 16.002 12.782 16.145C12.645 16.285 12.465 16.361 12.275 16.361H11.724C11.355 16.361 11.046 16.0749 11.004 15.6949C10.958 15.2829 10.593 14.987 10.176 15.032C9.76399 15.077 9.468 15.449 9.513 15.86C9.621 16.837 10.335 17.6031 11.25 17.8051V18C11.25 18.414 11.586 18.75 12 18.75C12.414 18.75 12.75 18.414 12.75 18V17.807C13.164 17.716 13.545 17.509 13.851 17.198C14.269 16.774 14.5 16.211 14.5 15.614C14.5 14.584 13.81 13.688 12.818 13.433Z" fill="#121212"/>
						</svg>
						<h1>{Gifted}</h1>
					</span>
					<p>You gifted</p>
				{:else}
				<span class="gifted-content">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.321 6.42505L17.236 4.90002C17.564 4.35202 17.572 3.69296 17.257 3.13696C16.942 2.58096 16.373 2.25 15.735 2.25H8.26501C7.62601 2.25 7.05701 2.58196 6.74301 3.13696C6.42901 3.69296 6.43601 4.35202 6.76501 4.90002L7.67899 6.42505C4.73999 9.13705 3.25 12.019 3.25 15C3.25 16.583 3.881 21.75 12 21.75C20.119 21.75 20.75 16.583 20.75 15C20.75 12.019 19.261 9.13705 16.321 6.42505ZM8.048 3.87598C8.075 3.82898 8.13901 3.75 8.26501 3.75H15.735C15.861 3.75 15.925 3.82998 15.952 3.87598C15.979 3.92298 16.014 4.02005 15.949 4.12805L14.935 5.81897H9.065L8.05099 4.12805C7.98599 4.02005 8.021 3.92398 8.048 3.87598ZM12 20.25C5.457 20.25 4.75 16.579 4.75 15C4.75 12.382 6.165 9.79995 8.935 7.31995H15.065C17.836 9.79995 19.25 12.382 19.25 15C19.25 16.579 18.543 20.25 12 20.25ZM12.818 13.433L11.553 13.114C11.393 13.072 11.257 12.982 11.153 12.847C11.054 12.72 11 12.556 11 12.387C11 11.974 11.325 11.639 11.725 11.639H12.276C12.645 11.639 12.954 11.9251 12.996 12.3051C13.041 12.7171 13.406 13.011 13.824 12.968C14.236 12.923 14.532 12.551 14.487 12.14C14.379 11.163 13.665 10.3969 12.75 10.1949V10C12.75 9.586 12.414 9.25 12 9.25C11.586 9.25 11.25 9.586 11.25 10V10.193C10.251 10.414 9.5 11.312 9.5 12.387C9.5 12.888 9.66699 13.378 9.96399 13.762C10.265 14.157 10.696 14.442 11.182 14.567L12.447 14.886C12.773 14.97 13 15.269 13 15.613C13 15.813 12.923 16.002 12.782 16.145C12.645 16.285 12.465 16.361 12.275 16.361H11.724C11.355 16.361 11.046 16.0749 11.004 15.6949C10.958 15.2829 10.593 14.987 10.176 15.032C9.76399 15.077 9.468 15.449 9.513 15.86C9.621 16.837 10.335 17.6031 11.25 17.8051V18C11.25 18.414 11.586 18.75 12 18.75C12.414 18.75 12.75 18.414 12.75 18V17.807C13.164 17.716 13.545 17.509 13.851 17.198C14.269 16.774 14.5 16.211 14.5 15.614C14.5 14.584 13.81 13.688 12.818 13.433Z" fill="#121212"/>
					</svg>
					<h1>let's start here</h1>
				</span>
				{/if}
		</div>
		<nav class="button-container">
			<div class="gifted inner">
				{#if Gifted.length > 0 && Invested.length > 0}
					<span class="gifted-content">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.321 6.42505L17.236 4.90002C17.564 4.35202 17.572 3.69296 17.257 3.13696C16.942 2.58096 16.373 2.25 15.735 2.25H8.26501C7.62601 2.25 7.05701 2.58196 6.74301 3.13696C6.42901 3.69296 6.43601 4.35202 6.76501 4.90002L7.67899 6.42505C4.73999 9.13705 3.25 12.019 3.25 15C3.25 16.583 3.881 21.75 12 21.75C20.119 21.75 20.75 16.583 20.75 15C20.75 12.019 19.261 9.13705 16.321 6.42505ZM8.048 3.87598C8.075 3.82898 8.13901 3.75 8.26501 3.75H15.735C15.861 3.75 15.925 3.82998 15.952 3.87598C15.979 3.92298 16.014 4.02005 15.949 4.12805L14.935 5.81897H9.065L8.05099 4.12805C7.98599 4.02005 8.021 3.92398 8.048 3.87598ZM12 20.25C5.457 20.25 4.75 16.579 4.75 15C4.75 12.382 6.165 9.79995 8.935 7.31995H15.065C17.836 9.79995 19.25 12.382 19.25 15C19.25 16.579 18.543 20.25 12 20.25ZM12.818 13.433L11.553 13.114C11.393 13.072 11.257 12.982 11.153 12.847C11.054 12.72 11 12.556 11 12.387C11 11.974 11.325 11.639 11.725 11.639H12.276C12.645 11.639 12.954 11.9251 12.996 12.3051C13.041 12.7171 13.406 13.011 13.824 12.968C14.236 12.923 14.532 12.551 14.487 12.14C14.379 11.163 13.665 10.3969 12.75 10.1949V10C12.75 9.586 12.414 9.25 12 9.25C11.586 9.25 11.25 9.586 11.25 10V10.193C10.251 10.414 9.5 11.312 9.5 12.387C9.5 12.888 9.66699 13.378 9.96399 13.762C10.265 14.157 10.696 14.442 11.182 14.567L12.447 14.886C12.773 14.97 13 15.269 13 15.613C13 15.813 12.923 16.002 12.782 16.145C12.645 16.285 12.465 16.361 12.275 16.361H11.724C11.355 16.361 11.046 16.0749 11.004 15.6949C10.958 15.2829 10.593 14.987 10.176 15.032C9.76399 15.077 9.468 15.449 9.513 15.86C9.621 16.837 10.335 17.6031 11.25 17.8051V18C11.25 18.414 11.586 18.75 12 18.75C12.414 18.75 12.75 18.414 12.75 18V17.807C13.164 17.716 13.545 17.509 13.851 17.198C14.269 16.774 14.5 16.211 14.5 15.614C14.5 14.584 13.81 13.688 12.818 13.433Z" fill="#121212"/>
						</svg>
						<h1>{Gifted}</h1>
					</span>
					<p>You gifted</p>
				{:else}
				<span class="gifted-content">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.321 6.42505L17.236 4.90002C17.564 4.35202 17.572 3.69296 17.257 3.13696C16.942 2.58096 16.373 2.25 15.735 2.25H8.26501C7.62601 2.25 7.05701 2.58196 6.74301 3.13696C6.42901 3.69296 6.43601 4.35202 6.76501 4.90002L7.67899 6.42505C4.73999 9.13705 3.25 12.019 3.25 15C3.25 16.583 3.881 21.75 12 21.75C20.119 21.75 20.75 16.583 20.75 15C20.75 12.019 19.261 9.13705 16.321 6.42505ZM8.048 3.87598C8.075 3.82898 8.13901 3.75 8.26501 3.75H15.735C15.861 3.75 15.925 3.82998 15.952 3.87598C15.979 3.92298 16.014 4.02005 15.949 4.12805L14.935 5.81897H9.065L8.05099 4.12805C7.98599 4.02005 8.021 3.92398 8.048 3.87598ZM12 20.25C5.457 20.25 4.75 16.579 4.75 15C4.75 12.382 6.165 9.79995 8.935 7.31995H15.065C17.836 9.79995 19.25 12.382 19.25 15C19.25 16.579 18.543 20.25 12 20.25ZM12.818 13.433L11.553 13.114C11.393 13.072 11.257 12.982 11.153 12.847C11.054 12.72 11 12.556 11 12.387C11 11.974 11.325 11.639 11.725 11.639H12.276C12.645 11.639 12.954 11.9251 12.996 12.3051C13.041 12.7171 13.406 13.011 13.824 12.968C14.236 12.923 14.532 12.551 14.487 12.14C14.379 11.163 13.665 10.3969 12.75 10.1949V10C12.75 9.586 12.414 9.25 12 9.25C11.586 9.25 11.25 9.586 11.25 10V10.193C10.251 10.414 9.5 11.312 9.5 12.387C9.5 12.888 9.66699 13.378 9.96399 13.762C10.265 14.157 10.696 14.442 11.182 14.567L12.447 14.886C12.773 14.97 13 15.269 13 15.613C13 15.813 12.923 16.002 12.782 16.145C12.645 16.285 12.465 16.361 12.275 16.361H11.724C11.355 16.361 11.046 16.0749 11.004 15.6949C10.958 15.2829 10.593 14.987 10.176 15.032C9.76399 15.077 9.468 15.449 9.513 15.86C9.621 16.837 10.335 17.6031 11.25 17.8051V18C11.25 18.414 11.586 18.75 12 18.75C12.414 18.75 12.75 18.414 12.75 18V17.807C13.164 17.716 13.545 17.509 13.851 17.198C14.269 16.774 14.5 16.211 14.5 15.614C14.5 14.584 13.81 13.688 12.818 13.433Z" fill="#121212"/>
					</svg>
					<h1>let's start here</h1>
				</span>
				{/if}
			</div>

			<button onclick={goto("/gift")}>
				<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M30.5398 6.04003C30.3452 6.2347 30.0892 6.33332 29.8332 6.33332C29.5772 6.33332 29.3212 6.23603 29.1265 6.04003L28.1665 5.08007V9.33332C28.1665 9.88532 27.7185 10.3333 27.1665 10.3333C26.6145 10.3333 26.1665 9.88532 26.1665 9.33332V5.08137L25.2065 6.04133C24.8158 6.432 24.1825 6.432 23.7918 6.04133C23.4012 5.65067 23.4012 5.01729 23.7918 4.62662L26.4585 1.95995C26.5505 1.86795 26.6612 1.79464 26.7838 1.74397C27.0278 1.64264 27.3038 1.64264 27.5478 1.74397C27.6705 1.79464 27.7812 1.86795 27.8732 1.95995L30.5398 4.62662C30.9305 5.01729 30.9305 5.64936 30.5398 6.04003ZM29.8332 16C29.8332 23.4867 23.6532 29.5386 16.1198 29.328C9.16384 29.1346 3.36651 23.336 3.17184 16.38C2.96118 8.8467 9.01318 2.66666 16.4998 2.66666C18.2692 2.66666 19.9585 3.0067 21.4958 3.64403C21.7092 3.73203 21.7918 3.98399 21.6972 4.19465C21.2025 5.29065 21.0172 6.57866 21.2972 7.93066C21.8145 10.4333 23.9852 12.3786 26.5278 12.6346C27.3532 12.7173 28.1545 12.6387 28.9012 12.416C29.1212 12.3507 29.3558 12.464 29.4132 12.6854C29.6865 13.74 29.8332 14.8547 29.8332 16ZM20.4625 18.6893C20.4625 17.0866 19.3758 15.692 17.8145 15.2974L15.6705 14.7653C15.3399 14.6826 15.0585 14.4974 14.8465 14.2267C14.6465 13.9734 14.5358 13.648 14.5358 13.3133C14.5358 12.488 15.2065 11.8174 16.0318 11.8174H16.9652C17.7278 11.8174 18.3665 12.3907 18.4532 13.1507C18.5145 13.7 19.0092 14.1 19.5585 14.0334C20.1079 13.972 20.5025 13.4774 20.4412 12.9281C20.2612 11.3254 19.0212 10.0893 17.4692 9.86392V9.33332C17.4692 8.78132 17.0212 8.33332 16.4692 8.33332C15.9172 8.33332 15.4692 8.78132 15.4692 9.33332V9.87206C13.8092 10.1441 12.5358 11.576 12.5358 13.3107C12.5358 14.0934 12.7985 14.8587 13.2718 15.456C13.7465 16.068 14.4238 16.5106 15.1838 16.7026L17.3278 17.2347C17.9958 17.404 18.4625 18.0013 18.4625 18.6867C18.4625 19.084 18.3065 19.4587 18.0225 19.7427C17.7385 20.0267 17.3639 20.1826 16.9665 20.1826H16.0332C15.2705 20.1826 14.6318 19.6093 14.5452 18.8493C14.4838 18.2999 13.9878 17.8973 13.4398 17.9666C12.8905 18.028 12.4958 18.5226 12.5572 19.0719C12.7345 20.6546 13.9452 21.8827 15.4692 22.1294V22.6667C15.4692 23.2187 15.9172 23.6667 16.4692 23.6667C17.0212 23.6667 17.4692 23.2187 17.4692 22.6667V22.1361C18.2092 22.0281 18.8958 21.7 19.4358 21.16C20.0985 20.4973 20.4625 19.6199 20.4625 18.6893Z" fill="#497951"/>
				</svg>
				send
			</button>
			
			<button onclick={goto("/request")}>
				<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M29.4122 12.6852C29.3549 12.4626 29.1202 12.3492 28.9002 12.4159C28.1549 12.6385 27.3522 12.7184 26.5269 12.6344C23.9842 12.3784 21.8149 10.4332 21.2962 7.9305C21.0162 6.5785 21.2015 5.2905 21.6962 4.1945C21.7909 3.98383 21.7082 3.73188 21.4949 3.64388C19.9575 3.00655 18.2669 2.6665 16.4989 2.6665C9.01219 2.6665 2.9602 8.84655 3.17087 16.3799C3.3642 23.3359 9.16287 29.1331 16.1189 29.3278C23.6522 29.5385 29.8322 23.4865 29.8322 15.9998C29.8335 14.8545 29.6869 13.7399 29.4122 12.6852ZM19.4375 21.1585C18.8975 21.6985 18.2109 22.0278 17.4709 22.1344V22.6665C17.4709 23.2185 17.0229 23.6665 16.4709 23.6665C15.9189 23.6665 15.4709 23.2185 15.4709 22.6665V22.1318C13.9469 21.8838 12.7375 20.6559 12.5589 19.0745C12.4975 18.5252 12.8922 18.0306 13.4415 17.9692C13.9909 17.8999 14.4842 18.3026 14.5469 18.8519C14.6322 19.6119 15.2722 20.1852 16.0349 20.1852H16.9682C17.3655 20.1852 17.7402 20.0291 18.0242 19.7451C18.3082 19.4611 18.4642 19.0865 18.4642 18.6891C18.4642 18.0025 17.9975 17.4065 17.3295 17.2371L15.1855 16.7052C14.4255 16.5119 13.7482 16.0705 13.2735 15.4585C12.8015 14.8612 12.5375 14.0958 12.5375 13.3132C12.5375 11.5785 13.8109 10.1452 15.4709 9.87451V9.33317C15.4709 8.78117 15.9189 8.33317 16.4709 8.33317C17.0229 8.33317 17.4709 8.78117 17.4709 9.33317V9.86117C19.0229 10.0865 20.2629 11.3225 20.4429 12.9251C20.5042 13.4745 20.1095 13.9691 19.5602 14.0304C19.0122 14.0971 18.5162 13.6971 18.4549 13.1478C18.3695 12.3878 17.7295 11.8145 16.9669 11.8145H16.0335C15.2082 11.8145 14.5375 12.4852 14.5375 13.3105C14.5375 13.6452 14.6482 13.9705 14.8482 14.2238C15.0589 14.4958 15.3415 14.6799 15.6722 14.7625L17.8162 15.2944C19.3762 15.6891 20.4642 17.0839 20.4642 18.6865C20.4629 19.6199 20.0989 20.4972 19.4375 21.1585ZM30.5402 7.37321L27.8735 10.0399C27.7815 10.1319 27.6709 10.2052 27.5482 10.2559C27.4255 10.3065 27.2962 10.3332 27.1655 10.3332C27.0349 10.3332 26.9055 10.3065 26.7829 10.2559C26.6602 10.2052 26.5495 10.1319 26.4575 10.0399L23.7909 7.37321C23.4002 6.98254 23.4002 6.34916 23.7909 5.9585C24.1815 5.56783 24.8149 5.56783 25.2055 5.9585L26.1655 6.91846V2.6665C26.1655 2.1145 26.6135 1.6665 27.1655 1.6665C27.7175 1.6665 28.1655 2.1145 28.1655 2.6665V6.91846L29.1255 5.9585C29.5162 5.56783 30.1495 5.56783 30.5402 5.9585C30.9309 6.34916 30.9309 6.98254 30.5402 7.37321Z" fill="#6057DB"/>
				</svg>
				request
			</button>
		</nav>
{/snippet}
<!-- This here should display two factors:
1. How much you have invested
2. How much you've gifted -->
<section class="balance-section">
	<!-- {@render balance()} -->
	{@render landingInfo()}
</section>

<style>
	.balance-section {
		display: flex;
		height: fit-content;
		gap: 1rem;
		color: light-dark(var(--white),color-mix(in srgb, var(--white), var(--general-text-color) 90%));
		transition: margin 0.3s ease-in-out;
		
		position: fixed;
		top: calc(var(--header-height));
		inset-inline: 0;
		
		align-items: center;
		align-self: center;
		z-index: 10;
		text-align: center;
		margin-top: -1rem;
	}

	.balance-info {
		display: flex;
		flex-direction: column;
		width: fit-content;
		height: calc(100% - (100% - var(--cut-off-height)));
		max-height:  calc(var(--header-intro-height) - (100% - var(--cut-off-height)));
		align-items: center;
		padding: 0 1%;
		gap: 10%;
		border-radius: 8px;
	}

	:is(.invested,.gifted) h1{
		font-size: clamp(1rem,36px,2.5rem);
		text-align: center;
		align-self: center;
		margin-bottom: 2% ;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
	}
	
	:is(.invested,.gifted) p{
		font-size: clamp(10px,12px,12px);	
	}

	.invested{
		font-weight: 500;
		padding-top: 10%;
		color: var(--general-text-color-invert);
	}
	.invested p {
		font-size: 1.2rem;
		font-weight: 300;
	}

	.gifted{
		color: var(--general-text-color); 
	}

	.gifted.outer{
		display: none;
	}

	.gifted.inner{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		outline: solid 1px var(--neutral-grey);
	}

	.gifted-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		max-height: 30px;
		width: 70%;
		min-width: fit-content;
		font-weight: 300;
		text-wrap: nowrap;
		border: none ;
		border-radius: 82px;
		gap: 5%;
		/* outline: solid red; */
	}

	.gifted-content svg{
		--d:clamp(.8rem,5vw,25px);
		min-width: var(--d);
		height: var(--d);
		aspect-ratio: 1;
		color: var(--general-text-color-invert,light-dark(var(--white),color-mix(in srgb, var(--white), var(--general-text-color) 90%)));
		path{
			fill: var(--general-text-color-invert,light-dark(var(--white),color-mix(in srgb, var(--white), var(--general-text-color) 90%)));
			fill:goldenrod;
		}
	}

	.gifted.inner svg{
		--d:clamp(.8rem,5vw,50px);
	}

	.gifted.inner h1{
		width: fit-content;
	}

	.gifted.inner p{
		font-size: 1rem;
		font-weight: 300;}
	
	.button-container {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		width: clamp(50%,50dvw ,300px);
		max-width: 500px;
		height: 18cqh;
		border-radius: 8px;
		background-color: var(--general-background-color,white);
		color: var(--general-text-color);
		box-shadow: 0px 4px 10px 0px #5858581A ;
	}


	.button-container button{
		flex: 1 1 60%;
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content:center;
		color: var(--general-text-color);;
		border-radius: 8px;
		padding: 1% 2%;

		svg{
			width: 2.5rem;
			margin-bottom: 1%;
			height: 2.5rem;
		}
	}

	/* section with button container */
	.balance-section:has(.button-container) {
		justify-content: center;
		height: 100%;
		align-items: unset;
		padding-top: 3%;
	}

	.add-money-link{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 4%;
		min-width: fit-content;
		width: 100%;
		max-height: 50px;
		font-size: clamp(0.8rem, 4vw, 1.125rem);
		font-weight: 300;
		text-wrap: nowrap;
		color: var(--general-text-color-invert,light-dark(var(--white),color-mix(in srgb, var(--white), var(--general-text-color) 90%)));
		border: 2px solid ;
		border-radius: 82px;
		padding: 9% clamp(10px,2%, 3%);
	}

	.add-money-link svg{
		min-width: 13px;
		height: 13px;
		aspect-ratio: 1;
	}

	.add-money-link svg path{
		fill: var(--general-text-color-invert,light-dark(var(--white),color-mix(in srgb, var(--white), var(--general-text-color) 90%)));
	}


	/* devider line */
	.button-container::before{
		content: '';
		width: 1px;
		height: 30%;
		position: absolute;
		bottom: 10%;
		left: 50%;
		z-index: 1;
		border-radius: inherit;
		background-color: var(--neutral-grey);
	}
		
	.balance-section:has(.button-container) .button-container .gifted {
		grid-column: 1 / -1;
		grid-row: 1 / 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--general-text-color);
	}

	@media (width <= 600px) {

		:root{
			--move-top:-4cqh;
			--margin-top:calc(var(--header-height) + var(--move-top) * 3);
			/* --margin-top:calc(var(--header-height) / 3  ); */
		}

		.balance-section {
			flex-direction: column;
			align-items: center;
			gap: calc(25% + var(--move-top));
			/* gap: calc(var(--margin-top)  30%); */
			padding: 0;
			width: 100%;
			/* margin-top: -3rem; */
			/* margin-top: var(--margin-top); */
			margin-top: var(--move-top);
			align-self: end;
			transform-origin: bottom;
		}
		
		.balance-section:has(.button-container) {
			justify-content: center;
			align-items: center;
		}

		.balance-section:has(.button-container) .balance-info {
			justify-content: center;
			align-items: center;
		}
		
		.balance-info {
			margin-top: 0;
			width: 50vw;
			flex-direction: column;
			align-items: center;
			text-align: center;
			justify-content: center;
		}	

		.invested h1{
			font-size: clamp(1rem,10vw,2.5rem);
			width: 100%;
			text-align: center;
		}

		.balance-section:has(.button-container) .balance-info .add-money-link {
			display: none;
		}

		.balance-section .gifted.inner{
			display: none !important;
		}

		.gifted.outer {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 4%;
			min-width: fit-content;
			font-size: clamp(0.5rem, 2vw, 1rem);
			text-wrap: nowrap;
			color: var(--general-text-color-invert,light-dark(var(--white),color-mix(in srgb, var(--white), var(--general-text-color) 90%)));
		}

		.gifted-content {
			display: flex;
			min-width: fit-content;
			width: 100%;
			max-height: 50px;
			font-size: clamp(0.8rem, 3vw, 2rem);
			font-weight: 300;
			border: 2px solid ;
			border-radius: 82px;
			padding: 9% clamp(10px,2%, 3%);
			gap: 0;
		}

		.gifted h1{
			max-height: 50px;
			padding: 9% clamp(5px,5vw, 1%);
			font-size: clamp(.5rem,7vw,1.3rem);
		}

		.gifted.outer p{
			translate: 0 10px;
		}

		.balance-section:has(.button-container) .button-container {
			position: relative;
			display:flex;
			flex-direction: row;
			align-items: center;
			justify-self: baseline;
			min-width: fit-content;
			width: clamp(50%,250px,80%);
			height: 84px;
			gap: 1%;
			padding: 2%;
			border-radius: 8px;
			background-color: var(--general-background-color,white);
			box-shadow: 0px 4px 10px 0px #5858581A ;
		}

		.button-container::before{
			content: '';
			width: 1px;
			height: 50%;
			position: absolute;
			bottom: 25% ;
			left: 50%;
			z-index: 1;
			border-radius: inherit;
			background-color: var(--neutral-grey);
		}
	}

</style>