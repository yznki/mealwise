export type ActiveTab = "plan" | "shopping";

export function useMealPlanOutput() {
	const store = useMealPlanStore();
	const activeTab = ref<ActiveTab>("plan");

	const TAB_OPTIONS = [
		{ label: "Meal Plan", value: "plan" as ActiveTab },
		{ label: "Shopping", value: "shopping" as ActiveTab }
	];

	async function onRegenerate() {
		await store.generatePlan();
	}

	return { store, activeTab, TAB_OPTIONS, onRegenerate };
}
