<script setup lang="ts">
	import type { Meal } from "#shared/types/meal-plan.types";

	export interface MealRowProps {
		/**
		 * The meal to display.
		 */
		meal: Meal;
	}

	defineProps<MealRowProps>();

	// Pill bg/text — breakfast: neutral, lunch: brand green, dinner: orange
	// dark: hue-tinted backgrounds preserved via opacity modifiers
	const PILL_CLASSES: Record<string, string> = {
		breakfast: "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400",
		lunch: "bg-surface-brand text-primary-500 dark:text-primary-300",
		dinner: "bg-orange-50 dark:bg-orange-500/15 text-orange-500"
	};

	const PILL_LABELS: Record<string, string> = {
		breakfast: "B",
		lunch: "L",
		dinner: "D"
	};

	// Emoji circle bg — breakfast: green, lunch: orange, dinner: neutral
	// bg-surface-brand auto-remaps to dark teal via @theme dark
	const EMOJI_BG_CLASSES: Record<string, string> = {
		breakfast: "bg-surface-brand",
		lunch: "bg-orange-50 dark:bg-orange-500/15",
		dinner: "bg-neutral-100 dark:bg-neutral-800"
	};

	function openRecipe(name: string) {
		window.open(`https://www.google.com/search?q=${encodeURIComponent(name + " recipe")}`, "_blank");
	}
</script>
<template>
	<button
		class="w-full flex items-center justify-between px-4 py-3 gap-3 active:bg-neutral-50 dark:active:bg-neutral-800 transition-colors"
		@click="openRecipe(meal.name)">
		<!-- Left: pill + emoji + name -->
		<div class="flex items-center gap-2.5 min-w-0">
			<!-- Meal type pill -->
			<span class="shrink-0 font-bold text-[11px] rounded-[6px] px-1.5 py-0.5" :class="PILL_CLASSES[meal.mealType]">
				{{ PILL_LABELS[meal.mealType] }}
			</span>
			<!-- Food emoji circle -->
			<div
				class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base"
				:class="EMOJI_BG_CLASSES[meal.mealType]">
				{{ meal.foodEmoji }}
			</div>
			<!-- Meal name -->
			<p class="text-[13px] font-medium text-neutral-900 dark:text-white leading-snug line-clamp-2 min-w-0 text-left">{{ meal.name }}</p>
		</div>
		<!-- Right: recipe link indicator -->
		<div class="shrink-0 w-7 h-7 rounded-full bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
			<UIcon name="i-lucide-arrow-up-right" class="w-3.5 h-3.5" />
		</div>
	</button>
</template>
