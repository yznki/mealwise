export type DietaryPreference = "no-restriction" | "halal" | "vegetarian" | "vegan";

export interface DietOption {
	value: DietaryPreference;
	label: string;
}

const DIET_OPTIONS: DietOption[] = [
	{ value: "no-restriction", label: "No Restriction" },
	{ value: "halal", label: "Halal" },
	{ value: "vegetarian", label: "Vegetarian" },
	{ value: "vegan", label: "Vegan" }
];

export function useInputForm() {
	const store = useMealPlanStore();

	const budgetInput = ref<string>(store.weeklyBudget ? String(store.weeklyBudget) : "");
	const showCurrencyModal = ref(false);

	const mealsPerDay = computed({
		get: () => store.mealsPerDay,
		set: (v: number) => store.setMealsPerDay(v as 2 | 3)
	});

	const numberOfDays = computed({
		get: () => store.numberOfDays,
		set: (v: number) => store.setNumberOfDays(v as 5 | 6 | 7)
	});

	function onBudgetInput(e: Event) {
		const val = Number((e.target as HTMLInputElement).value);
		store.setBudget(val);
	}

	function onGenerate() {
		store.generatePlan(); // fire — don't await, so isGenerating is true when we land on /plan
		navigateTo("/plan");
	}

	return {
		store,
		DIET_OPTIONS,
		budgetInput,
		showCurrencyModal,
		mealsPerDay,
		numberOfDays,
		onBudgetInput,
		onGenerate
	};
}
