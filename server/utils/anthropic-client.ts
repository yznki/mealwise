import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
	if (!client) {
		const { anthropicApiKey } = useRuntimeConfig();
		if (!anthropicApiKey) {
			throw createError({ statusCode: 500, message: "AI service is not configured" });
		}
		client = new Anthropic({ apiKey: anthropicApiKey, timeout: 30_000 });
	}
	return client;
}
