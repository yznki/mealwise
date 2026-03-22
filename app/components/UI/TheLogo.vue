<script setup lang="ts">
	export interface TheLogoProps {
		/**
		 * Controls the rendered size of the logo mark and wordmark.
		 * @default 'md'
		 */
		size?: "sm" | "md" | "lg";
	}

	const props = withDefaults(defineProps<TheLogoProps>(), { size: "md" });

	const iconSizeClass = computed(() => {
		if (props.size === "sm") return "w-6 h-6";
		if (props.size === "lg") return "w-10 h-10";
		return "w-8 h-8";
	});

	const textSizeClass = computed(() => {
		if (props.size === "sm") return "text-xl";
		if (props.size === "lg") return "text-4xl";
		return "text-[28px]";
	});
</script>
<template>
	<span class="inline-flex items-center gap-2">
		<img src="/logo.svg" :class="iconSizeClass" alt="" aria-hidden="true" />
		<span class="font-display font-bold text-primary-500" :class="textSizeClass">Mealwise</span>
	</span>
</template>
