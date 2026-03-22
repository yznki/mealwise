<script setup lang="ts">
	const emit = defineEmits<{
		/**
		 * Fired when the user chooses to go back and change inputs.
		 */
		reset: [];
	}>();

	const store = useMealPlanStore();

	async function onTryAgain() {
		await store.generatePlan();
	}

	function onChangeInputs() {
		emit("reset");
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
		<UIRecapBar @edit="onChangeInputs" />

		<USeparator />

		<!-- Error content -->
		<div class="flex-1 flex flex-col items-center px-6 pt-20 gap-4">
			<!-- Error icon -->
			<div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-[0_0_24px_rgba(239,68,68,0.2)]">
				<span class="font-display font-black text-[36px] text-red-500 leading-none">!</span>
			</div>
			<!-- Headline -->
			<p class="font-display font-bold text-2xl text-neutral-900 text-center mt-4">Something went wrong.</p>
			<!-- Subtext -->
			<p class="text-sm text-neutral-500 text-center max-w-70">
				We couldn't generate your plan. This is usually a connection issue — not your inputs.
			</p>
			<!-- Error detail -->
			<p v-if="store.generationError" class="text-xs text-red-500 text-center max-w-70">
				{{ store.generationError }}
			</p>
		</div>

		<!-- Recovery actions -->
		<div class="px-6 pb-12 flex flex-col gap-4 items-center">
			<UButton
				block
				:loading="store.isGenerating"
				class="rounded-[14px] py-4.5 font-display font-bold text-[17px] bg-primary-500 text-white"
				@click="onTryAgain">
				Try Again
			</UButton>
			<button class="text-sm font-medium text-primary-500" @click="onChangeInputs">← Change my inputs</button>
		</div>
	</div>
</template>
