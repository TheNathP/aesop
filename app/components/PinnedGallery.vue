<script setup lang="ts">
import { createPinnedGalleryAnimation } from '~/utils/animations/pinnedGallery'
interface GallerySlide {
  image: string
  alt: string
  citation: string
}
defineProps<{
  slides: GallerySlide[]
}>()
const sectionRef = ref<HTMLElement | null>(null)
const imageRefs = ref<HTMLElement[]>([])
let gsapCtx: gsap.Context | null = null
function setImageRef(el: unknown, index: number) {
  if (el instanceof HTMLElement) {
    imageRefs.value[index] = el
  }
}
onMounted(() => {
  if (!sectionRef.value || imageRefs.value.length === 0) return
  gsapCtx = createPinnedGalleryAnimation({
    section: sectionRef.value,
    images: imageRefs.value,
  })
})
onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
<template>
  <section ref="sectionRef" class="relative grid grid-cols-1 md:grid-cols-2 min-h-[300vh]">
    <div class="pinned-gallery__left relative h-[60vh] md:h-screen overflow-hidden">
      <div
        v-for="(slide, index) in slides"
        :key="`img-${index}`"
        :ref="(el) => setImageRef(el, index)"
        class="absolute inset-0 [will-change:opacity]"
      >
        <img
          :src="slide.image"
          :alt="slide.alt"
          loading="lazy"
          class="w-full h-full object-cover block"
        />
      </div>
    </div>
    <div class="flex flex-col">
      <div
        v-for="(slide, index) in slides"
        :key="`quote-${index}`"
        class="h-screen flex items-center justify-center p-12"
      >
        <blockquote class="font-title text-[1.375rem] md:text-[1.875rem] leading-snug text-aesop-text-main max-w-[28rem] text-center m-0 [quotes:none]">
          {{ slide.citation }}
        </blockquote>
      </div>
    </div>
  </section>
</template>