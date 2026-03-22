import type { MealPlanResponse } from "#shared/types/meal-plan.types";

export const MOCK_MEAL_PLAN: MealPlanResponse = {
	currencyCode: "EUR",
	currencySymbol: "€",
	estimatedTotalCost: "€37.50",
	dayPlans: [
		{
			dayName: "Monday",
			dayNumber: 1,
			meals: [
				{ name: "Oat porridge with banana", mealType: "breakfast", foodEmoji: "🥣" },
				{ name: "Chickpea & Spinach Curry", mealType: "lunch", foodEmoji: "🍛" },
				{ name: "Pasta with tomato sauce", mealType: "dinner", foodEmoji: "🍝" }
			]
		},
		{
			dayName: "Tuesday",
			dayNumber: 2,
			meals: [
				{ name: "Scrambled eggs on toast", mealType: "breakfast", foodEmoji: "🍳" },
				{ name: "Lentil soup with bread", mealType: "lunch", foodEmoji: "🍲" },
				{ name: "Stir-fried rice with vegetables", mealType: "dinner", foodEmoji: "🍚" }
			]
		},
		{
			dayName: "Wednesday",
			dayNumber: 3,
			meals: [
				{ name: "Greek yogurt with honey", mealType: "breakfast", foodEmoji: "🫙" },
				{ name: "Tuna salad sandwich", mealType: "lunch", foodEmoji: "🥪" },
				{ name: "Bean & vegetable stew", mealType: "dinner", foodEmoji: "🥘" }
			]
		},
		{
			dayName: "Thursday",
			dayNumber: 4,
			meals: [
				{ name: "Banana smoothie", mealType: "breakfast", foodEmoji: "🍌" },
				{ name: "Vegetable soup with roll", mealType: "lunch", foodEmoji: "🥣" },
				{ name: "Baked potato with beans", mealType: "dinner", foodEmoji: "🥔" }
			]
		},
		{
			dayName: "Friday",
			dayNumber: 5,
			meals: [
				{ name: "Toast with peanut butter", mealType: "breakfast", foodEmoji: "🍞" },
				{ name: "Rice & lentil bowl", mealType: "lunch", foodEmoji: "🍱" },
				{ name: "Vegetable curry with rice", mealType: "dinner", foodEmoji: "🍛" }
			]
		}
	],
	shoppingListCategories: [
		{
			categoryKey: "produce",
			categoryLabel: "Produce",
			categoryEmoji: "🥬",
			items: [
				{ name: "Spinach", quantity: "200g", category: "produce" },
				{ name: "Banana", quantity: "5 pcs", category: "produce" },
				{ name: "Garlic", quantity: "1 bulb", category: "produce" },
				{ name: "Onion", quantity: "3 pcs", category: "produce" }
			]
		},
		{
			categoryKey: "pantry",
			categoryLabel: "Pantry",
			categoryEmoji: "🏺",
			items: [
				{ name: "Canned chickpeas", quantity: "2 × 400g", category: "pantry" },
				{ name: "Pasta (penne)", quantity: "500g", category: "pantry" },
				{ name: "Rolled oats", quantity: "500g", category: "pantry" },
				{ name: "Canned tomatoes", quantity: "2 × 400g", category: "pantry" },
				{ name: "Red lentils", quantity: "400g", category: "pantry" }
			]
		},
		{
			categoryKey: "fridge",
			categoryLabel: "Fridge",
			categoryEmoji: "🧀",
			items: [
				{ name: "Eggs", quantity: "6 pcs", category: "fridge" },
				{ name: "Greek yogurt", quantity: "500g", category: "fridge" },
				{ name: "Canned tuna", quantity: "2 × 160g", category: "fridge" }
			]
		}
	]
};
