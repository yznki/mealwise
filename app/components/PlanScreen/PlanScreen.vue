<script setup lang="ts">
	const store = useMealPlanStore();

	onMounted(() => {
		if (!store.isGenerating && !store.mealPlanResponse && !store.generationError) {
			navigateTo("/");
		}
	});

	function onEdit() {
		navigateTo("/");
	}

	function onReset() {
		store.resetAll();
		navigateTo("/");
	}
</script>
<template>
	<GeneratingScreen v-if="store.isGenerating" @edit="onEdit" />
	<ErrorScreen v-else-if="store.generationError" @reset="onReset" />
	<MealPlanOutput v-else-if="store.mealPlanResponse" @reset="onReset" />
</template>
