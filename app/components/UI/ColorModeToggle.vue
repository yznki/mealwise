<script setup lang="ts">
	type Preference = "system" | "light" | "dark";

	const colorMode = useColorMode();

	const CYCLE: Preference[] = ["system", "light", "dark"];

	const ICONS: Record<Preference, string> = {
		system: "i-lucide-monitor",
		light: "i-lucide-sun",
		dark: "i-lucide-moon"
	};

	const LABELS: Record<Preference, string> = {
		system: "Device",
		light: "Light",
		dark: "Dark"
	};

	const preference = computed(() => colorMode.preference as Preference);
	const currentIcon = computed((): string => ICONS[preference.value] ?? "i-lucide-monitor");
	const currentLabel = computed((): string => LABELS[preference.value] ?? "Device");

	function cycle() {
		const next = CYCLE[(CYCLE.indexOf(preference.value) + 1) % CYCLE.length] ?? "system";
		colorMode.preference = next;
	}
</script>
<template>
	<button
		class="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
		:aria-label="`Color mode: ${currentLabel}. Tap to switch.`"
		@click="cycle">
		<UIcon :name="currentIcon" class="w-4 h-4" />
	</button>
</template>
