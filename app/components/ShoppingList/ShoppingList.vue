<script setup lang="ts">
	const store = useMealPlanStore();

	const categories = computed(() => store.mealPlanResponse?.shoppingListCategories ?? []);

	const totalItems = computed(() => categories.value.reduce((sum, cat) => sum + cat.items.length, 0));
</script>
<template>
	<div class="flex flex-col">
		<!-- Summary bar -->
		<div class="flex items-center justify-between px-5 py-3 bg-white dark:bg-neutral-900">
			<p class="text-sm text-neutral-500">
				<span class="font-medium text-neutral-900 dark:text-neutral-100">{{ totalItems }}</span> items ·
				<span class="font-medium text-neutral-900 dark:text-neutral-100">{{ categories.length }}</span> categories
			</p>
			<p class="font-display font-bold text-sm text-primary-500">Est. {{ store.mealPlanResponse?.estimatedTotalCost }}</p>
		</div>

		<USeparator />

		<!-- Category list -->
		<div class="flex flex-col gap-4 px-5 py-4">
			<ShoppingCategoryCard v-for="category in categories" :key="category.categoryKey" :category="category" />
		</div>
	</div>
</template>
