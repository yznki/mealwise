interface RateLimitEntry {
	count: number;
	resetAt: number;
}

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

const ipStore = new Map<string, RateLimitEntry>();

export default defineEventHandler((event) => {
	if (getMethod(event) !== "POST" || event.path !== "/api/generate") return;

	const now = Date.now();

	// Purge expired entries to prevent unbounded memory growth
	for (const [key, entry] of ipStore) {
		if (now > entry.resetAt) ipStore.delete(key);
	}

	const ip = getRequestIP(event, { xForwardedFor: true });

	if (!ip) {
		console.warn("[rate-limit] Unable to determine IP, allowing request through");
		return;
	}

	const entry = ipStore.get(ip);

	if (!entry || now > entry.resetAt) {
		ipStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
		return;
	}

	if (entry.count >= MAX_REQUESTS) {
		console.warn(`[rate-limit] IP ${ip} exceeded limit`);
		throw createError({
			statusCode: 429,
			message: "Too many requests. Please wait a moment before generating another plan."
		});
	}

	entry.count++;
});
