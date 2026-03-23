<script setup lang="ts">
	import type { ShoppingListItem } from "#shared/types/meal-plan.types";

	export interface ShoppingItemRowProps {
		/**
		 * The shopping list item to display.
		 */
		item: ShoppingListItem;
	}

	defineProps<ShoppingItemRowProps>();

	const checked = ref(false);
</script>
<template>
	<button class="w-full flex items-center justify-between px-4 py-3.5 gap-3 active:bg-neutral-50 dark:active:bg-neutral-800 transition-colors" @click="checked = !checked">
		<!-- Left: checkbox + name -->
		<div class="flex items-center gap-3 min-w-0">
			<div
				class="shrink-0 w-6 h-6 rounded-[6px] border-2 flex items-center justify-center transition-colors"
				:class="checked ? 'bg-primary-500 border-primary-500' : 'bg-white dark:bg-neutral-900 border-primary-500'">
				<UIcon v-if="checked" name="i-lucide-check" class="w-3.5 h-3.5 text-white" />
			</div>
			<p class="text-sm text-left truncate transition-colors" :class="checked ? 'text-neutral-400 line-through' : 'text-neutral-900 dark:text-neutral-100'">
				{{ item.name }}
			</p>
		</div>
		<!-- Right: quantity -->
		<p class="shrink-0 text-[13px] transition-colors" :class="checked ? 'text-neutral-300' : 'text-neutral-400'">{{ item.quantity }}</p>
	</button>
</template>
