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
const isMobile = ref(false)
let gsapCtx: gsap.Context | null = null

function setImageRef(el: unknown, index: number) {
  if (el instanceof HTMLElement) {
    imageRefs.value[index] = el
  }
}

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile, { passive: true })

  if (!isMobile.value && sectionRef.value && imageRefs.value.length > 0) {
    gsapCtx = createPinnedGalleryAnimation({
      section: sectionRef.value,
      images: imageRefs.value,
    })
  }
})

onUnmounted(() => {
  gsapCtx?.revert()
  window.removeEventListener('resize', checkMobile)
})
</script>
<template>
  <!-- Desktop: original pinned gallery with GSAP animation -->
  <section
    v-if="!isMobile"
    ref="sectionRef"
    class="relative grid grid-cols-2 min-h-[300vh]"
  >
    <div class="pinned-gallery__left relative h-screen overflow-hidden">
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
        <blockquote class="font-title text-[1.875rem] leading-snug text-aesop-text-main max-w-[28rem] m-0 [quotes:none]">
          {{ slide.citation }}
        </blockquote>
      </div>
    </div>
  </section>

  <!-- Mobile: simple alternating image / text stacked layout -->
  <section
    v-else
    class="flex flex-col px-5 py-8 gap-10"
  >
    <div
      v-for="(slide, index) in slides"
      :key="`mobile-${index}`"
      class="flex flex-col gap-6"
    >
      <div class="flex justify-center">
        <img
          :src="slide.image"
          :alt="slide.alt"
          loading="lazy"
          class="w-[350px] h-[350px] max-w-full object-cover block"
        />
      </div>
      <blockquote class="font-title text-[1.375rem] leading-snug text-aesop-text-main max-w-[28rem] m-0 [quotes:none]">
        {{ slide.citation }}
      </blockquote>
    </div>
  </section>
</template>