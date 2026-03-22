<script setup lang="ts">
	import { useMealPlanOutput } from "./useMealPlanOutput";

	const emit = defineEmits<{
		/**
		 * Fired when the user taps the reset (×) button.
		 */
		reset: [];
	}>();

	const { store, activeTab, TAB_OPTIONS, onRegenerate } = useMealPlanOutput();
</script>
<template>
	<div class="flex flex-col h-dvh bg-neutral-50">
		<!-- Sticky header -->
		<div class="bg-white px-5 pt-5 pb-3 flex flex-col gap-3 border-b border-neutral-100">
			<!-- Title row -->
			<div class="flex items-center justify-between">
				<p class="font-display font-bold text-2xl text-neutral-900">Your Week</p>
				<div class="flex items-center gap-2">
					<div class="bg-surface-brand rounded-full px-3 py-1.5">
						<span class="text-xs font-semibold text-primary-500">{{ store.mealPlanResponse?.estimatedTotalCost }}</span>
					</div>
					<button
						class="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors"
						:class="store.isGenerating ? 'opacity-50 pointer-events-none' : ''"
						@click="onRegenerate">
						<UIcon name="i-lucide-refresh-cw" class="w-3.5 h-3.5" :class="store.isGenerating ? 'animate-spin' : ''" />
					</button>
					<button
						class="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors"
						@click="emit('reset')">
						<UIcon name="i-lucide-x" class="w-3.5 h-3.5" />
					</button>
				</div>
			</div>
			<!-- Tab switcher -->
			<UISegmentedToggle v-model="activeTab" :options="TAB_OPTIONS" />
		</div>

		<!-- Scrollable tab content -->
		<div class="flex-1 overflow-y-auto scroll-smooth-mobile">
			<Transition
				enter-active-class="transition-all duration-150"
				enter-from-class="opacity-0 translate-y-1"
				leave-active-class="transition-all duration-150"
				leave-to-class="opacity-0 translate-y-1"
				mode="out-in">
				<DayPlanList v-if="activeTab === 'plan'" key="plan" />
				<ShoppingList v-else key="shopping" />
			</Transition>
		</div>
	</div>
</template>
