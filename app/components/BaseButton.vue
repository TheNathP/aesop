<script setup lang="ts">
interface Props {
  isActive?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  isActive: false,
  type: 'button',
})
</script>

<template>
  <button
    :type="type"
    :class="[
      'font-body text-sm text-aesop-text-main bg-transparent border border-solid cursor-pointer whitespace-nowrap px-8 py-3.5 transition-colors duration-200 w-full sm:w-auto text-center hover:bg-aesop-text-main hover:text-aesop-bg-general hover:border-aesop-text-main',
      isActive
        ? 'border-aesop-text-main bg-aesop-bg-product'
        : 'border-[#999999]'
    ]"
  >
    <slot />
  </button>
</template>
