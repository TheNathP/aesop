<script setup lang="ts">
interface Props {
  header: string
  title: string
  text: string
  primaryLabel?: string
  secondaryLabel?: string
  image: string
  imageAlt?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'primary-click'): void
  (e: 'secondary-click'): void
}>()
</script>

<template>
  <section class="w-full flex flex-row">
    <!-- Bloc gauche — 2/5, contenu centré verticalement -->
    <div class="w-2/5 flex items-center bg-aesop-bg-general py-20 px-12">
      <div class="max-w-[500px]">
        <p class="font-body text-xs tracking-widest uppercase text-aesop-text-disabled mb-4">
          {{ header }}
        </p>

        <h2 class="font-title text-[1.75rem] lg:text-[2.25rem] leading-snug text-aesop-text-main mb-6">
          {{ title }}
        </h2>

        <p class="font-body text-sm leading-relaxed text-aesop-text-body mb-10">
          {{ text }}
        </p>

        <div v-if="primaryLabel || secondaryLabel" class="flex flex-col gap-3">
          <button
            v-if="primaryLabel"
            type="button"
            class="w-full py-3 px-6 border border-aesop-text-main bg-transparent text-aesop-text-main font-body text-sm tracking-wide transition-colors duration-200 hover:bg-aesop-bg-product"
            @click="emit('primary-click')"
          >
            {{ primaryLabel }}
          </button>
          <button
            v-if="secondaryLabel"
            type="button"
            class="w-full py-3 px-6 border border-aesop-text-main bg-aesop-text-main text-white font-body text-sm tracking-wide transition-colors duration-200 hover:bg-[#1a1a1a]"
            @click="emit('secondary-click')"
          >
            {{ secondaryLabel }}
          </button>
        </div>
      </div>
    </div>

    <!-- Bloc droit — 3/5, image plein espace -->
    <div class="w-3/5 relative overflow-hidden">
      <img
        :src="image"
        :alt="imageAlt ?? title"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  </section>
</template>
