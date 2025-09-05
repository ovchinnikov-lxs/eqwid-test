<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const props = defineProps<{
  variant?: Variant
  size?: Size
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()

const classList = computed(() => {
  const v = props.variant ?? 'primary'
  const s = props.size ?? 'md'
  const base =
    'inline-flex items-center justify-center rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[.99] disabled:opacity-60 disabled:pointer-events-none cursor-pointer'
  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }
  const variants: Record<Variant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  return [base, sizes[s], variants[v], props.block ? 'w-full' : ''].join(' ')
})
</script>

<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled"
    :class="classList"
  >
    <slot />
  </button>
</template>
