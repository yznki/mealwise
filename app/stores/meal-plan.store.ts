import type { MealPlanResponse } from "#shared/types/meal-plan.types";
import { getCurrencyByCode } from "#shared/constants/supported-currencies";
import type { SupportedCurrency } from "#shared/constants/supported-currencies";

export const useMealPlanStore = defineStore("meal-plan", () => {
	// State
	const weeklyBudget = ref<number | null>(null);
	const currencyCode = ref("EUR");
	const currencySymbol = ref("€");
	const mealsPerDay = ref<2 | 3>(2);
	const numberOfDays = ref<5 | 6 | 7>(5);
	const dietaryPreference = ref<"no-restriction" | "halal" | "vegetarian" | "vegan">("no-restriction");
	const isGenerating = ref(false);
	const generationError = ref<string | null>(null);
	const mealPlanResponse = ref<MealPlanResponse | null>(null);

	// Getters
	const isFormValid = computed(() => weeklyBudget.value !== null && weeklyBudget.value > 0);
	const selectedCurrency = computed<SupportedCurrency | undefined>(() => getCurrencyByCode(currencyCode.value));

	// Actions
	function setBudget(budget: number) {
		weeklyBudget.value = budget;
	}
	function setCurrency(code: string) {
		const currency = getCurrencyByCode(code);
		if (!currency) throw new Error(`Unsupported currency: ${code}`);
		currencyCode.value = currency.code;
		currencySymbol.value = currency.symbol;
	}
	function setMealsPerDay(meals: 2 | 3) {
		mealsPerDay.value = meals;
	}
	function setNumberOfDays(days: 5 | 6 | 7) {
		numberOfDays.value = days;
	}
	function setDietaryPreference(pref: "no-restriction" | "halal" | "vegetarian" | "vegan") {
		dietaryPreference.value = pref;
	}
	async function generatePlan() {
		isGenerating.value = true;
		generationError.value = null;
		try {
			mealPlanResponse.value = await $fetch<MealPlanResponse>("/api/generate", {
				method: "POST",
				body: {
					weeklyBudget: weeklyBudget.value,
					currencyCode: currencyCode.value,
					currencySymbol: currencySymbol.value,
					mealsPerDay: mealsPerDay.value,
					numberOfDays: numberOfDays.value,
					dietaryPreference: dietaryPreference.value
				}
			});
		} catch (error: unknown) {
			const fetchError = error as { data?: { message?: string } };
			generationError.value = fetchError?.data?.message ?? "Something went wrong. Please try again.";
		} finally {
			isGenerating.value = false;
		}
	}
	function resetPlan() {
		mealPlanResponse.value = null;
		generationError.value = null;
	}
	function resetAll() {
		weeklyBudget.value = null;
		currencyCode.value = "EUR";
		currencySymbol.value = "€";
		mealsPerDay.value = 2;
		numberOfDays.value = 5;
		dietaryPreference.value = "no-restriction";
		isGenerating.value = false;
		generationError.value = null;
		mealPlanResponse.value = null;
	}

	return {
		weeklyBudget,
		currencyCode,
		currencySymbol,
		mealsPerDay,
		numberOfDays,
		dietaryPreference,
		isGenerating,
		generationError,
		mealPlanResponse,
		isFormValid,
		selectedCurrency,
		setBudget,
		setCurrency,
		setMealsPerDay,
		setNumberOfDays,
		setDietaryPreference,
		generatePlan,
		resetPlan,
		resetAll
	};
});
