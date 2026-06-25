<script setup lang="ts">
interface Props {
  tag: string
  image: string
  imageAlt?: string
  name: string
  description: string
  selected?: boolean
}

defineProps<Props>()
</script>

<template>
  <article
    class="group flex flex-col cursor-pointer w-[calc((100%-3rem)/3.7)] min-w-[220px] shrink-0 select-none border border-solid transition-[border-color] duration-200"
    :class="selected ? 'border-aesop-text-main' : 'border-transparent'"
  >
    <!-- Tag -->
    <div class="bg-[#F6F5E8] relative">
      <div
        v-if="selected"
        class="absolute top-2 right-2 w-6 h-6 bg-aesop-text-main rounded-full flex items-center justify-center text-white z-10"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <p
        class="font-body text-xs text-aesop-accent italic px-4 pt-4 pb-2 leading-relaxed"
      >
        {{ tag }}
      </p>
    </div>

    <!-- Image -->
    <div class="w-full h-[350px] overflow-hidden bg-[#F6F5E8] relative">
      <img
        :src="image"
        :alt="imageAlt || name"
        class="w-full h-full object-contain select-none"
        loading="lazy"
        draggable="false"
      />
    </div>

    <!-- Name + Description -->
    <div class="px-4 py-4 transition-colors duration-300 bg-transparent group-hover:bg-[#F6F5E8]">
      <h3 class="font-body text-sm text-aesop-text-main leading-snug">
        {{ name }}
      </h3>
      <p
        class="font-body text-xs text-aesop-text-body mt-1 leading-relaxed"
      >
        {{ description }}
      </p>
    </div>
  </article>
</template>
