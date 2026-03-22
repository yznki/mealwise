import { z } from "zod";
import { SUPPORTED_CURRENCIES } from "#shared/constants/supported-currencies";

const currencyCodes = SUPPORTED_CURRENCIES.map((c) => c.code) as [string, ...string[]];

export const MealPlanRequestSchema = z.object({
	weeklyBudget: z.number().positive().max(1_000_000),
	currencyCode: z.enum(currencyCodes),
	currencySymbol: z.string().min(1),
	mealsPerDay: z.union([z.literal(2), z.literal(3)]),
	numberOfDays: z.union([z.literal(5), z.literal(6), z.literal(7)]),
	dietaryPreference: z.enum(["no-restriction", "halal", "vegetarian", "vegan"])
});

export type ValidatedMealPlanRequest = z.infer<typeof MealPlanRequestSchema>;
