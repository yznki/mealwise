export const SUPPORTED_CURRENCIES = [
	// Europe & Americas
	{ code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺", region: "europe-americas" },
	{ code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", region: "europe-americas" },
	{ code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", region: "europe-americas" },
	{ code: "TRY", symbol: "₺", name: "Turkish Lira", flag: "🇹🇷", region: "europe-americas" },
	// GCC
	{ code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪", region: "gcc" },
	{ code: "SAR", symbol: "﷼", name: "Saudi Riyal", flag: "🇸🇦", region: "gcc" },
	{ code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar", flag: "🇰🇼", region: "gcc" },
	{ code: "QAR", symbol: "﷼", name: "Qatari Riyal", flag: "🇶🇦", region: "gcc" },
	{ code: "BHD", symbol: ".د.ب", name: "Bahraini Dinar", flag: "🇧🇭", region: "gcc" },
	{ code: "OMR", symbol: "﷼", name: "Omani Rial", flag: "🇴🇲", region: "gcc" },
	// Levant
	{ code: "JOD", symbol: "د.ا", name: "Jordanian Dinar", flag: "🇯🇴", region: "levant" },
	{ code: "LBP", symbol: "ل.ل", name: "Lebanese Pound", flag: "🇱🇧", region: "levant" },
	{ code: "IQD", symbol: "ع.د", name: "Iraqi Dinar", flag: "🇮🇶", region: "levant" }
] as const satisfies ReadonlyArray<{
	code: string;
	symbol: string;
	name: string;
	flag: string;
	region: "europe-americas" | "gcc" | "levant";
}>;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export function getCurrencyByCode(code: string): SupportedCurrency | undefined {
	return SUPPORTED_CURRENCIES.find((c) => c.code === code);
}
