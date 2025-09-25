<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { Chart as ChartType } from 'chart.js';

const numberFormatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
});

function formatCurrency(value) {
		const num = Number(value);
		const safe = isNaN(num) ? 0 : num;
		return '€' + numberFormatter.format(safe);
}	

let pv = $state<boolean>(false);
function toggleInitialAmount() {
  pv = !pv;
}

  // simple local type
 interface InvestmentData {
    year: number;
    principal: number;
    returns: number;
    total: number;
 }

  // Svelte 5 local state
  let {currentPortfolioValue} = $props<{currentPortfolioValue: number, yearlyContribution: number}>();
  let initialAmount = $derived(pv ? currentPortfolioValue.toFixed(2) : '10000');
  let years = $state('10');
  let returnRate = $state('7');
  let frequency = $state<'annually' | 'monthly'>('annually');
  let additionalAmount = $state('1000');
  let results = $state<InvestmentData[]>([]);

  // derived values
  let finalValue = $derived.by(() =>
  results.length ? results[results.length - 1].total : 0
);

let totalPrincipal = $derived.by(() =>
  results.length ? results[results.length - 1].principal : 0
);

let growthPercentage = $derived.by(() => {
  const p = totalPrincipal;
  const f = finalValue;
  return p ? Math.round(((f - p) / p) * 100) : 0;
});

  // Chart state
  let chartCanvas: HTMLCanvasElement | null = null;
  let chartInstance: ChartType | null = null;

  // Calculation — note: preventDefault handled here per your request.
  function calculateInvestment(e?: Event) {
    if (e?.preventDefault) e.preventDefault();

    const initial = Number(initialAmount) || 0;
    const yearsNum = Math.max(0, Number(years) || 0);
    const rate = (Number(returnRate) || 0) / 100;
    const additional = Number(additionalAmount) || 0;

    const data: InvestmentData[] = [];
    let currentVal = initial;
    let principal = initial;

    // Year 0 snapshot
    data.push({
      year: 0,
      principal: Math.round(principal),
      returns: 0,
      total: Math.round(currentVal),
    });

    // For each year: we add contributions at the START of each period, then apply growth.
    for (let y = 1; y <= yearsNum; y++) {
      if (frequency === 'annually') {
        currentVal += additional;   // contribution at start of year
        principal += additional;
        currentVal *= 1 + rate;     // apply annual growth
      } else {
        // monthly contributions, compounding monthly
        let yearlyAddition = 0;
        for (let m = 0; m < 12; m++) {
          currentVal += additional;           // monthly contribution at start of month
          yearlyAddition += additional;
          currentVal *= 1 + rate / 12;        // monthly growth
        }
        principal += yearlyAddition;
      }

      const returns = currentVal - principal;
      data.push({
        year: y,
        principal: Math.round(principal),
        returns: Math.round(Math.max(0, returns)),
        total: Math.round(currentVal),
      });
    }

    results = data;
  }

  

  // Chart / DOM effect: re-create chart whenever canvas or results change
  $effect(() => {
    if (!chartCanvas) return;
    // destroy previous chart
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    if (!results.length) return;

    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;

    const labels = results.map((d) => (d.year === 0 ? 'Now' : `${d.year}y`));

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Contributions',
            data: results.map((r) => r.principal),
            borderColor: '#6b7280',
            backgroundColor: 'rgba(107,114,128,0.20)',
            fill: true,
            pointRadius: 0,
            tension: 0.4,
            stack: 'stack1',
            order: 1,
          },
          {
            label: 'Returns',
            data: results.map((r) => r.returns),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34,197,94,0.25)',
            fill: true,
            pointRadius: 0,
            tension: 0.4,
            stack: 'stack1',
            order: 1,
          },
        ],
      },
      options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: {
			callbacks: {
				label: (ctx) => `€${ctx.raw.toLocaleString()}`,
			},
			},
		},
		scales: {
			x: { grid: { display: false } },
			y: {
			stacked: true,
			grid: { color: '#e5e7eb', borderDash: [5, 5] },
			ticks: {
				callback: (value) => `€${(Number(value) / 1000).toFixed(0)}k`,
			},
			},
		},
		},
    });
  });

  // initialise with default values so chart shows on load
  onMount(() => calculateInvestment());
</script>

<section class="con max-w-5xl mx-auto p-6 space-y-8">

 <div class="grid lg:grid-cols-2 gap-8">
    <!-- form -->
    <form class="p-5 bg-white rounded shadow space-y-4" onsubmit={calculateInvestment}>
      <label class="flex items-center gap-2">
        <span class="flex-nowrap w-max ">Start with €</span>
        <input type="number" bind:value={initialAmount} class="border p-2 w-32" step="0.01" />
        <button onclick={toggleInitialAmount} class="w-min bg-green-600 text-white py-3 rounded p-1">portfolio</button>
      </label>

      <label class="flex items-center gap-2">
        <span>Years</span>
        <input type="number" bind:value={years} class="border p-2 w-20" />
      </label>

      <label class="flex items-center gap-2">
        <span class="flex-nowrap">Annual return %</span>
        <input type="number" bind:value={returnRate} class="border p-2 w-20" />
      </label>

      <label class="flex items-center gap-2">
        <span class="flex-nowrap">Add €</span>
        <input type="number" bind:value={additionalAmount} class="border p-2 w-32" />
        <select bind:value={frequency} class="border p-2">
          <option value="annually">annually</option>
          <option value="monthly">monthly</option>
        </select>
      </label>

      <button type="submit" class="w-full bg-green-600 text-white py-2 rounded">
        Calculate
      </button>
    </form>

    <!-- results -->
    <div class="space-y-4">
      <div class="p-6 bg-green-50 rounded text-center">
        <div class="text-sm text-gray-600">Final value</div>
        <div class="text-4xl font-bold">€{finalValue.toLocaleString()}</div>
        <div class="text-green-700 font-semibold">{growthPercentage}% growth</div>
      </div>

      <div class="h-72 bg-white rounded shadow p-4">
        <canvas bind:this={chartCanvas}></canvas>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-gray-50 rounded text-center">
          <div class="text-sm text-gray-600">Your contributions</div>
          <div class="text-xl font-bold">€{totalPrincipal.toLocaleString()}</div>
        </div>
        <div class="p-4 bg-green-50 rounded text-center">
          <div class="text-sm text-gray-600">Investment growth</div>
          <div class="text-xl font-bold text-green-700">€{(finalValue - totalPrincipal).toLocaleString()}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
	input, select {
		background-color: white;
	}

	.con{
		overflow-x: hidden;
		max-width: 100%;
		margin-bottom: 5%;
		padding: unset;
		padding: 5%;
		background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 90% );
		border-radius: 10px;
	}

	.con > *{
    overflow: hidden;
	}

	.con > *> *{
		width: 99%;
	}

  .con > * form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .con > * form label {
    all:unset;
    display: flex;
    width: clamp(150px, 100%, 300px);
    align-items: center;
    gap: 3%;
  }

  .con > * form label > * {
    flex: 0 1 30%;
    width: clamp(50px, 30%, 150px);
  }

  .con > * form label span{
     flex: 0 1 fit-content;
     text-wrap: nowrap;
     margin-right: 1rem;
  } 

</style>