export const STEPS = ["Selecting meals for your week", "Calculating quantities", "Consolidating shopping list"] as const;

export type ProgressStep = (typeof STEPS)[number];

export function useGeneratingScreen() {
	const store = useMealPlanStore();
	const currentStep = ref(0);
	const timedOut = ref(false);

	const interval = setInterval(() => {
		if (currentStep.value < STEPS.length - 1) {
			currentStep.value++;
		} else {
			clearInterval(interval);
		}
	}, 2500);

	const timeoutHandle = setTimeout(() => {
		if (store.isGenerating) {
			timedOut.value = true;
		}
	}, 30_000);

	onUnmounted(() => {
		clearInterval(interval);
		clearTimeout(timeoutHandle);
	});

	return { STEPS, currentStep, timedOut };
}
