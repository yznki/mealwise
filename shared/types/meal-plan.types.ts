export interface MealPlanRequest {
	weeklyBudget: number;
	currencyCode: string;
	currencySymbol: string;
	mealsPerDay: 2 | 3;
	numberOfDays: 5 | 6 | 7;
	dietaryPreference: "no-restriction" | "halal" | "vegetarian" | "vegan";
}

export interface Meal {
	name: string;
	mealType: "breakfast" | "lunch" | "dinner";
	foodEmoji: string;
}

export interface DayPlan {
	dayName: string;
	dayNumber: number;
	meals: Meal[];
}

export interface ShoppingListItem {
	name: string;
	quantity: string;
	category: "produce" | "pantry" | "fridge" | "other";
}

export interface ShoppingListCategory {
	categoryKey: "produce" | "pantry" | "fridge" | "other";
	categoryLabel: string;
	categoryEmoji: string;
	items: ShoppingListItem[];
}

export interface MealPlanResponse {
	dayPlans: DayPlan[];
	shoppingListCategories: ShoppingListCategory[];
	estimatedTotalCost: string;
	currencyCode: string;
	currencySymbol: string;
}

export interface ApiErrorResponse {
	statusCode: number;
	message: string;
	details?: unknown;
}
