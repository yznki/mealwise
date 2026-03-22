<script setup lang="ts">
	const emit = defineEmits<{
		/**
		 * Fired when the user taps the Edit pill.
		 */
		edit: [];
	}>();

	const store = useMealPlanStore();

	const DIET_LABELS: Record<string, string> = {
		"no-restriction": "No Restriction",
		halal: "Halal",
		vegetarian: "Vegetarian",
		vegan: "Vegan"
	};

	const recapText = computed(
		() =>
			`${store.currencySymbol}${store.weeklyBudget} · ${store.mealsPerDay} meals/day · ${store.numberOfDays} days · ${DIET_LABELS[store.dietaryPreference]}`
	);
</script>
<template>
	<div class="flex items-center justify-between px-6 py-3 bg-surface-brand">
		<p class="text-sm font-medium text-primary-700 truncate pr-3">{{ recapText }}</p>
		<button class="shrink-0 text-xs font-semibold text-primary-500 bg-white rounded-full px-3 py-1" @click="emit('edit')">
			Edit
		</button>
	</div>
</template>
