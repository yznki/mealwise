<script setup lang="ts">
	const store = useMealPlanStore();
	const dayPlans = computed(() => store.mealPlanResponse?.dayPlans ?? []);
</script>
<template>
	<div class="flex flex-col gap-4 px-5 py-4">
		<DayCard v-for="dayPlan in dayPlans" :key="dayPlan.dayNumber" :day-plan="dayPlan" />
	</div>
</template>
