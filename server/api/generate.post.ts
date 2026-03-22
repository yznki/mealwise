import { MealPlanRequestSchema } from "#shared/utils/meal-plan.schemas";
import { generateMealPlan } from "#server/services/meal-plan.service";
import { handleServerError } from "#server/utils/error-handler";

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const validatedRequest = await MealPlanRequestSchema.parseAsync(body);
		return await generateMealPlan(validatedRequest);
	} catch (error) {
		handleServerError(error);
	}
});
