<script setup lang="ts">
	import { SUPPORTED_CURRENCIES } from "#shared/constants/supported-currencies";

	export interface CurrencyModalProps {
		/**
		 * The ISO 4217 code of the currently selected currency.
		 */
		selectedCode: string;
	}

	defineProps<CurrencyModalProps>();

	const open = defineModel<boolean>({ required: true });

	const emit = defineEmits<{
		/**
		 * Fired when the user picks a currency row.
		 */
		select: [code: string];
	}>();

	const REGION_LABELS: Record<string, string> = {
		"europe-americas": "Europe & Americas",
		gcc: "GCC",
		levant: "Levant"
	};

	const regions = ["europe-americas", "gcc", "levant"] as const;

	function currenciesForRegion(region: string) {
		return SUPPORTED_CURRENCIES.filter((c) => c.region === region);
	}

	function onSelect(code: string) {
		emit("select", code);
		open.value = false;
	}
</script>
<template>
	<UModal v-model:open="open" title="Select Currency">
		<template #body>
			<div class="overflow-y-auto max-h-[60vh] -mx-6 -my-4">
				<template v-for="region in regions" :key="region">
					<!-- sticky top-0 with an opaque background matching the modal panel so scrolled content doesn't bleed through -->
					<div class="px-6 py-2 text-xs font-semibold text-neutral-400 uppercase bg-neutral-50 dark:bg-neutral-900 sticky top-0 z-10">
						{{ REGION_LABELS[region] }}
					</div>
					<button
						v-for="currency in currenciesForRegion(region)"
						:key="currency.code"
						class="w-full px-6 py-3 flex items-center gap-3 active:bg-neutral-100 dark:active:bg-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
						@click="onSelect(currency.code)">
						<span class="text-xl">{{ currency.flag }}</span>
						<span class="flex-1 text-sm text-neutral-900 dark:text-white text-left">{{ currency.name }}</span>
						<span class="text-sm text-neutral-400 dark:text-neutral-500">{{ currency.code }} · {{ currency.symbol }}</span>
						<span v-if="currency.code === selectedCode" class="text-primary-500 ml-1">
							<UIcon name="i-lucide-check" class="w-4 h-4" />
						</span>
					</button>
				</template>
			</div>
		</template>
	</UModal>
</template>
