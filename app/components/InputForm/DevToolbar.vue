<script setup lang="ts">
	import { MOCK_MEAL_PLAN } from "./mockPlanData";

	const store = useMealPlanStore();

	async function goToLoading() {
		store.$patch({ isGenerating: true, generationError: null, mealPlanResponse: null });
		await navigateTo("/plan");
		setTimeout(() => {
			store.$patch({ isGenerating: false, mealPlanResponse: MOCK_MEAL_PLAN });
		}, 4000);
	}

	function goToPlan() {
		store.$patch({ mealPlanResponse: MOCK_MEAL_PLAN, generationError: null, isGenerating: false });
		navigateTo("/plan");
	}

	function goToError() {
		store.$patch({ generationError: "Mock error: AI service timed out.", mealPlanResponse: null, isGenerating: false });
		navigateTo("/plan");
	}
</script>
<template>
	<div class="shrink-0 flex items-center gap-2 px-3 py-2 bg-neutral-900 border-b border-neutral-700">
		<span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest shrink-0">Dev</span>
		<div class="flex gap-1.5 flex-1">
			<button
				class="text-[11px] font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded px-2 py-1 transition-colors"
				@click="goToLoading">
				Loading
			</button>
			<button
				class="text-[11px] font-medium text-primary-400 bg-neutral-800 hover:bg-neutral-700 rounded px-2 py-1 transition-colors"
				@click="goToPlan">
				Plan Ready
			</button>
			<button
				class="text-[11px] font-medium text-red-400 bg-neutral-800 hover:bg-neutral-700 rounded px-2 py-1 transition-colors"
				@click="goToError">
				Error
			</button>
		</div>
	</div>
</template>
