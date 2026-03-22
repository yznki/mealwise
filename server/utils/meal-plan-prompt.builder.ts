import type { ValidatedMealPlanRequest } from "#shared/utils/meal-plan.schemas";

const DIETARY_CONSTRAINT: Record<string, string> = {
	"no-restriction": "none",
	halal: "halal (no pork, no alcohol)",
	vegetarian: "vegetarian (no meat/fish, dairy+eggs OK)",
	vegan: "vegan (no animal products)"
};

export function buildMealPlanPrompt(request: ValidatedMealPlanRequest): string {
	const budget = `${request.currencySymbol}${request.weeklyBudget}`;
	const mealTypes = request.mealsPerDay === 2 ? "lunch, dinner" : "breakfast, lunch, dinner";
	const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].slice(0, request.numberOfDays).join("/");

	return `${request.numberOfDays}-day meal plan, ${request.mealsPerDay} meals/day (${mealTypes}), budget ${budget}. Diet: ${DIETARY_CONSTRAINT[request.dietaryPreference]}.

Reply with ONLY this JSON (no markdown, no code fences):
{"d":[[{"n":"Lentil Soup","e":"🍲"},{"n":"Pasta","e":"🍝"}]],"s":[{"k":"produce","i":[{"n":"Tomatoes","q":"1kg"}]}],"c":"≈ ${request.currencySymbol}N"}

d = ${request.numberOfDays} arrays (${dayNames}), each with ${request.mealsPerDay} meals in order (${mealTypes}).
s = shopping list keyed by "produce"|"pantry"|"fridge"|"other", deduplicated across all days.
c = estimated total as a whole number.`;
}
