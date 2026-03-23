<script setup lang="ts">
	import type { DayPlan } from "#shared/types/meal-plan.types";

	export interface DayCardProps {
		/**
		 * The day plan data to render.
		 */
		dayPlan: DayPlan;
	}

	defineProps<DayCardProps>();
</script>
<template>
	<!-- dark:bg-neutral-800 keeps the card body lighter than the bg-neutral-900 header,
	     preserving the same dark-on-light contrast as light mode (white card, dark header) -->
	<div class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-[14px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] overflow-hidden">
		<!-- Day header — bg-neutral-900 is darker than both the light card (white) and dark card (neutral-800) -->
		<div class="bg-neutral-900 flex items-center justify-between px-4 py-3">
			<p class="font-display font-bold text-[15px] text-white">{{ dayPlan.dayName }}</p>
			<p class="text-xs text-neutral-500">Day {{ dayPlan.dayNumber }}</p>
		</div>
		<!-- Meal rows -->
		<div>
			<template v-for="(meal, index) in dayPlan.meals" :key="meal.mealType">
				<MealRow :meal="meal" />
				<div v-if="index < dayPlan.meals.length - 1" class="h-px bg-neutral-100 dark:bg-neutral-700" />
			</template>
		</div>
	</div>
</template>
