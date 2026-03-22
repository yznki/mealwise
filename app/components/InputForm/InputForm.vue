<script setup lang="ts">
	import { useInputForm } from "./useInputForm";

	const { store, DIET_OPTIONS, budgetInput, showCurrencyModal, mealsPerDay, numberOfDays, onBudgetInput, onGenerate } = useInputForm();

	const isDev = import.meta.dev;
</script>
<template>
	<div class="flex flex-col h-dvh bg-white">
		<!-- Dev-only toolbar -->
		<InputFormDevToolbar v-if="isDev" />

		<!-- Scrollable content -->
		<div class="flex-1 overflow-y-auto pb-34">
			<!-- App Header -->
			<div class="px-6 pt-12 pb-6">
				<UITheLogo />
				<p class="text-sm text-neutral-500 mt-1">Plan your week in 60 seconds.</p>
			</div>

			<USeparator />

			<!-- Budget Section -->
			<div class="px-6 py-6 flex flex-col gap-2">
				<label class="text-sm font-medium text-neutral-900">Weekly Budget</label>
				<div
					class="border border-neutral-200 rounded-xl flex items-center gap-2 px-4 py-3.5 focus-within:border-primary-500 transition-colors">
					<!-- Currency selector -->
					<button class="bg-surface-brand rounded-md px-2.5 py-1 flex items-center gap-1 shrink-0" @click="showCurrencyModal = true">
						<span class="text-base leading-none">{{ store.selectedCurrency?.flag }}</span>
						<span class="text-sm font-semibold text-primary-500">{{ store.currencyCode }}</span>
						<UIcon name="i-lucide-chevron-down" class="w-3 h-3 text-primary-500" />
					</button>
					<!-- Amount input -->
					<input
						v-model="budgetInput"
						type="number"
						min="0"
						placeholder="0"
						class="flex-1 bg-transparent outline-none text-base text-neutral-900 placeholder:text-neutral-300"
						@input="onBudgetInput" />
				</div>
				<p class="text-xs text-neutral-400">Enter your total food budget for the week</p>
			</div>

			<USeparator />

			<!-- Meals & Days Section -->
			<div class="px-6 py-6 flex flex-col gap-4">
				<label class="text-sm font-medium text-neutral-900">Meals Per Day</label>
				<UISegmentedToggle
					v-model="mealsPerDay"
					:options="[
						{ label: '2 meals', value: 2 },
						{ label: '3 meals', value: 3 }
					]" />
				<label class="text-sm font-medium text-neutral-900 mt-2">Days of the Week</label>
				<UISegmentedToggle
					v-model="numberOfDays"
					:options="[
						{ label: '5 days', value: 5 },
						{ label: '6 days', value: 6 },
						{ label: '7 days', value: 7 }
					]" />
			</div>

			<USeparator />

			<!-- Dietary Section -->
			<div class="px-6 py-6 flex flex-col gap-3">
				<label class="text-sm font-medium text-neutral-900">Dietary Preference</label>
				<div class="flex flex-wrap gap-2">
					<button
						v-for="opt in DIET_OPTIONS"
						:key="opt.value"
						class="rounded-full px-4 py-2.25 text-sm font-medium transition-colors"
						:class="store.dietaryPreference === opt.value ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-500'"
						@click="store.setDietaryPreference(opt.value)">
						{{ opt.label }}
					</button>
				</div>
			</div>

			<USeparator />
		</div>

		<!-- Fixed CTA -->
		<div class="fixed bottom-0 inset-x-0 bg-white px-6 pt-4 pb-[max(40px,env(safe-area-inset-bottom))]">
			<UButton
				block
				:disabled="!store.isFormValid || store.isGenerating"
				:loading="store.isGenerating"
				class="rounded-[14px] py-4.5 font-display font-bold text-[17px] bg-primary-500 text-white disabled:opacity-50"
				@click="onGenerate">
				Generate My Plan
			</UButton>
			<p v-if="store.generationError" class="text-center text-xs text-red-500 mt-2">
				{{ store.generationError }}
			</p>
			<p v-else class="text-center text-xs text-neutral-400 mt-2">No account needed · Ready in under 10 seconds</p>
		</div>

		<!-- Currency Modal -->
		<UICurrencyModal v-model="showCurrencyModal" :selected-code="store.currencyCode" @select="store.setCurrency($event)" />
	</div>
</template>
