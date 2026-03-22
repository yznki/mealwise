import { z } from "zod";
import { getAnthropicClient } from "#server/utils/anthropic-client";
import { buildMealPlanPrompt } from "#server/utils/meal-plan-prompt.builder";
import type { MealPlanResponse, ShoppingListCategory } from "#shared/types/meal-plan.types";
import type { ValidatedMealPlanRequest } from "#shared/utils/meal-plan.schemas";

// Compact schema — single-char keys to minimise output tokens
const aiMealSchema = z.object({
	n: z.string(), // name
	e: z.string() // foodEmoji
});

const aiShoppingItemSchema = z.object({
	n: z.string(), // name
	q: z.string() // quantity
});

const aiShoppingCategorySchema = z.object({
	k: z.enum(["produce", "pantry", "fridge", "other"]), // key
	i: z.array(aiShoppingItemSchema) // items
});

const aiResponseSchema = z.object({
	d: z.array(z.array(aiMealSchema)), // days → meals
	s: z.array(aiShoppingCategorySchema), // shopping list
	c: z.string() // totalCost
});

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MEAL_TYPES_BY_COUNT: Record<number, Array<"breakfast" | "lunch" | "dinner">> = {
	2: ["lunch", "dinner"],
	3: ["breakfast", "lunch", "dinner"]
};

const CATEGORY_META: Record<string, { label: string; emoji: string }> = {
	produce: { label: "Fresh Produce", emoji: "🥦" },
	pantry: { label: "Pantry & Dry Goods", emoji: "🫙" },
	fridge: { label: "Fridge & Dairy", emoji: "🧀" },
	other: { label: "Other", emoji: "🛒" }
};

export async function generateMealPlan(request: ValidatedMealPlanRequest): Promise<MealPlanResponse> {
	const client = getAnthropicClient();

	const message = await client.messages.create({
		model: "claude-haiku-4-5-20251001",
		max_tokens: 2048,
		messages: [{ role: "user", content: buildMealPlanPrompt(request) }]
	});

	const firstBlock = message.content[0];
	if (!firstBlock || firstBlock.type !== "text") {
		console.error("[generate] Unexpected AI response format:", JSON.stringify(message.content));
		throw new SyntaxError("AI service returned an unexpected response format");
	}

	if (process.env.NODE_ENV !== "production") {
		console.log("[generate] Raw AI response:", firstBlock.text);
	}

	try {
		const text = firstBlock.text
			.trim()
			.replace(/^```(?:json)?\s*/i, "")
			.replace(/\s*```$/, "");
		const ai = aiResponseSchema.parse(JSON.parse(text));

		const mealTypes = MEAL_TYPES_BY_COUNT[request.mealsPerDay]!;

		const shoppingListCategories: ShoppingListCategory[] = ai.s.map((cat) => ({
			categoryKey: cat.k,
			categoryLabel: CATEGORY_META[cat.k]!.label,
			categoryEmoji: CATEGORY_META[cat.k]!.emoji,
			items: cat.i.map((item) => ({ name: item.n, quantity: item.q, category: cat.k }))
		}));

		return {
			dayPlans: ai.d.map((meals, i) => ({
				dayName: DAY_NAMES[i]!,
				dayNumber: i + 1,
				meals: meals.map((meal, j) => ({
					name: meal.n,
					foodEmoji: meal.e,
					mealType: mealTypes[j]!
				}))
			})),
			shoppingListCategories,
			estimatedTotalCost: ai.c,
			currencyCode: request.currencyCode,
			currencySymbol: request.currencySymbol
		};
	} catch (error) {
		console.error("[generate] Failed to parse/validate AI response:", error);
		throw error;
	}
}
