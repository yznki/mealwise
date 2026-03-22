<script setup lang="ts" generic="T extends string | number">
	export interface SegmentedToggleOption<T> {
		/**
		 * The display label for this option.
		 */
		label: string;
		/**
		 * The value emitted when this option is selected.
		 */
		value: T;
	}

	export interface SegmentedToggleProps<T> {
		/**
		 * The options to display in the segmented toggle.
		 */
		options: SegmentedToggleOption<T>[];
	}

	const props = defineProps<SegmentedToggleProps<T>>();

	const value = defineModel<T>({ required: true });

	const activeIndex = computed(() => props.options.findIndex((o) => o.value === value.value));
</script>
<template>
	<div class="relative flex w-full rounded-xl bg-neutral-100 p-1">
		<!-- Sliding indicator -->
		<div
			class="absolute top-1 bottom-1 left-1 rounded-[10px] bg-white shadow-sm pointer-events-none transition-transform duration-200 ease-in-out"
			:style="{
				width: `calc((100% - 8px) / ${options.length})`,
				transform: `translateX(calc(${activeIndex} * 100%))`
			}" />
		<!-- Options -->
		<button
			v-for="option in options"
			:key="option.value"
			class="relative z-10 flex-1 min-w-0 py-3 text-center text-sm cursor-pointer rounded-[10px] transition-colors duration-200"
			:class="option.value === value ? 'text-neutral-900 font-medium' : 'text-neutral-400'"
			@click="value = option.value">
			{{ option.label }}
		</button>
	</div>
</template>
