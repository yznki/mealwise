<script setup>
	useSeoMeta({
		title: "Mealwise — Eat smart. Spend less.",
		description: "Generate a personalised weekly meal plan that fits your budget in under 60 seconds.",
		ogTitle: "Mealwise — Eat smart. Spend less.",
		ogDescription: "Generate a personalised weekly meal plan that fits your budget in under 60 seconds."
	});
</script>
<template>
	<UApp>
		<div class="min-h-dvh pt-[var(--safe-area-top)] pb-[var(--safe-area-bottom)]">
			<NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
		</div>
	</UApp>
</template>
