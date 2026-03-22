import {
	APIError,
	AuthenticationError,
	RateLimitError,
	APIConnectionError,
	APIConnectionTimeoutError,
	InternalServerError
} from "@anthropic-ai/sdk";
import { ZodError } from "zod";

export function handleServerError(error: unknown): never {
	if (error instanceof ZodError) {
		throw createError({
			statusCode: 422,
			message: "Request validation failed",
			data: error.flatten((issue) => issue.message).fieldErrors
		});
	}

	if (error instanceof AuthenticationError) {
		console.error("[generate] Anthropic AuthenticationError:", error.message);
		throw createError({
			statusCode: 401,
			message: "Invalid API key. Check your ANTHROPIC_API_KEY environment variable."
		});
	}

	if (error instanceof RateLimitError) {
		console.error("[generate] Anthropic RateLimitError:", error.message);
		throw createError({
			statusCode: 429,
			message: "Rate limit reached. Please try again in a moment."
		});
	}

	if (error instanceof APIConnectionTimeoutError) {
		console.error("[generate] Anthropic APIConnectionTimeoutError:", error.message);
		throw createError({
			statusCode: 504,
			message: "The AI service timed out. Please try again."
		});
	}

	if (error instanceof APIConnectionError) {
		console.error("[generate] Anthropic APIConnectionError:", error.message);
		throw createError({
			statusCode: 502,
			message: "Unable to connect to the AI service. Please try again."
		});
	}

	if (error instanceof InternalServerError) {
		console.error("[generate] Anthropic InternalServerError (status %d):", error.status, error.message);
		// 529 = Anthropic overloaded
		const statusCode = error.status === 529 ? 503 : 502;
		const message =
			error.status === 529
				? "The AI service is temporarily unavailable. Please try again."
				: "The AI service encountered an internal error. Please try again.";
		throw createError({ statusCode, message });
	}

	if (error instanceof APIError) {
		console.error("[generate] Anthropic APIError (status %d):", error.status, error.message);
		throw createError({
			statusCode: 502,
			message: error.message
		});
	}

	if (error instanceof SyntaxError) {
		console.error("[generate] JSON parse error:", error.message);
		throw createError({
			statusCode: 500,
			message: "AI service returned malformed response"
		});
	}

	console.error("[generate] Unexpected error:", error);
	throw createError({
		statusCode: 500,
		message: "An unexpected error occurred. Please try again."
	});
}
