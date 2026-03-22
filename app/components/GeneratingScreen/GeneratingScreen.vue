<script setup lang="ts">
	import { useGeneratingScreen } from "./useGeneratingScreen";

	const emit = defineEmits<{
		/**
		 * Fired when the user taps the Edit pill in the recap bar.
		 */
		edit: [];
	}>();

	const { STEPS, currentStep, timedOut } = useGeneratingScreen();

	function stepIndicatorClass(index: number): string {
		if (index < currentStep.value) return "bg-primary-500";
		if (index === currentStep.value) return "border-2 border-primary-500";
		return "border-2 border-neutral-200";
	}

	function stepLabelClass(index: number): string {
		if (index < currentStep.value) return "text-neutral-400";
		if (index === currentStep.value) return "text-neutral-900 font-medium";
		return "text-neutral-300";
	}
</script>
<template>
	<div class="flex flex-col h-dvh bg-white">
		<!-- App header -->
		<div class="px-6 pt-12 pb-6">
			<UITheLogo />
			<p class="text-sm text-neutral-500 mt-1">Plan your week in 60 seconds.</p>
		</div>

		<USeparator />

		<!-- Input recap bar -->
		<UIRecapBar @edit="emit('edit')" />

		<USeparator />

		<!-- Loading hero -->
		<div class="flex-1 flex flex-col items-center justify-center px-6 gap-8">
			<!-- Spinner -->
			<div class="w-14 h-14 rounded-full border-4 border-surface-brand border-t-primary-500 animate-spin" />

			<!-- Headline + subtext -->
			<div class="flex flex-col items-center gap-2">
				<p class="font-display font-bold text-[22px] text-neutral-900 text-center">Building your plan…</p>
				<p class="text-sm text-neutral-500 text-center max-w-65">Finding meals that fit your budget and dietary preference.</p>
			</div>

			<!-- Progress steps card -->
			<div class="bg-white rounded-2xl shadow-md px-6 py-5 w-full max-w-85.5 flex flex-col gap-4">
				<div v-for="(step, index) in STEPS" :key="step" class="flex items-center gap-3">
					<!-- Step indicator circle -->
					<div class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center" :class="stepIndicatorClass(index)">
						<UIcon v-if="index < currentStep" name="i-lucide-check" class="w-3 h-3 text-white" />
						<div v-else-if="index === currentStep" class="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
						<div v-else class="w-2 h-2 rounded-full bg-neutral-300" />
					</div>
					<!-- Step label -->
					<p class="text-sm" :class="stepLabelClass(index)">{{ step }}</p>
				</div>
			</div>

			<!-- Timeout fallback — shown if API hasn't responded after 30 seconds -->
			<Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-300" leave-to-class="opacity-0">
				<div v-if="timedOut" class="w-full max-w-85.5 bg-red-100 rounded-xl px-4 py-3 flex flex-col gap-1">
					<p class="text-sm font-medium text-neutral-900">This is taking longer than usual. Please wait or go back and try again.</p>
					<button class="text-sm font-medium text-primary-500 text-left mt-1" @click="emit('edit')">← Go Back</button>
				</div>
			</Transition>
		</div>
	</div>
</template>
