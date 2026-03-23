<script setup lang="ts">
	import type { ShoppingListCategory } from "#shared/types/meal-plan.types";

	export interface ShoppingCategoryCardProps {
		/**
		 * The shopping list category to display.
		 */
		category: ShoppingListCategory;
	}

	defineProps<ShoppingCategoryCardProps>();
</script>
<template>
	<div class="bg-white dark:bg-neutral-900 rounded-[14px] shadow-sm overflow-hidden">
		<!-- Category header -->
		<div class="flex items-center gap-2 px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800">
			<span class="text-base leading-none">{{ category.categoryEmoji }}</span>
			<p class="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">{{ category.categoryLabel }}</p>
		</div>
		<div class="h-px bg-neutral-100 dark:bg-neutral-800" />
		<!-- Items -->
		<div>
			<template v-for="(item, index) in category.items" :key="item.name">
				<ShoppingItemRow :item="item" />
				<div v-if="index < category.items.length - 1" class="h-px bg-neutral-100 dark:bg-neutral-800 mx-4" />
			</template>
		</div>
	</div>
</template>
