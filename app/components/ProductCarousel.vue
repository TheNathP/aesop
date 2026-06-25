<script setup lang="ts">
interface Product {
  tag: string
  image: string
  imageAlt?: string
  name: string
  description: string
}

interface Props {
  header?: string
  title: string
  text: string
  primaryLabel?: string
  secondaryLabel?: string
  products: Product[]
  showCloseButton?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'primaryClick'): void
  (e: 'secondaryClick'): void
  (e: 'close'): void
}>()

const trackRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)
const scrollProgress = ref(0)

/* ── Scroll state ── */
function updateScrollState() {
  const el = trackRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 2
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 2

  const maxScroll = el.scrollWidth - el.clientWidth
  scrollProgress.value = maxScroll > 0 ? el.scrollLeft / maxScroll : 0
}

function scrollBy(direction: -1 | 1) {
  const el = trackRef.value
  if (!el) return
  el.scrollBy({ left: direction * 300, behavior: 'smooth' })
}

/* ── Drag-to-scroll ── */
const isDragging = ref(false)
let startX = 0
let scrollStart = 0

function onPointerDown(e: PointerEvent) {
  const el = trackRef.value
  if (!el) return
  isDragging.value = true
  startX = e.clientX
  scrollStart = el.scrollLeft
  el.setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  const el = trackRef.value
  if (!el) return
  const dx = e.clientX - startX
  el.scrollLeft = scrollStart - dx
}

function onPointerUp() {
  isDragging.value = false
}

onMounted(() => {
  updateScrollState()
})
</script>

<template>
  <section class="flex flex-col w-full bg-aesop-bg-general">
    <!-- Carousel area -->
    <div
      class="relative w-full flex flex-row border-y border-aesop-text-disabled/20 bg-aesop-bg-general overflow-hidden"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Intro panel (fixed, mirrors ProductHighlight left panel) -->
      <div class="w-2/5 shrink-0 flex items-center py-20 px-12">
        <div class="max-w-[500px]">
          <div v-if="header || showCloseButton" class="flex items-start gap-4 mb-6">
            <button
              v-if="showCloseButton"
              type="button"
              class="text-aesop-text-main hover:opacity-60 transition-opacity bg-transparent border-0 cursor-pointer p-0 font-bold text-xl leading-none mt-0.5"
              aria-label="Fermer"
              @click="emit('close')"
            >
              ✕
            </button>
            <p
              v-if="header"
              :class="[
                'font-body',
                showCloseButton ? 'text-[0.875rem] font-bold text-aesop-text-main leading-tight whitespace-pre-wrap' : 'text-xs tracking-widest uppercase text-aesop-text-disabled mb-4'
              ]"
            >
              {{ header }}
            </p>
          </div>

          <h2 class="font-title text-[1.75rem] lg:text-[2.25rem] leading-snug text-aesop-text-main mb-6">
            {{ title }}
          </h2>

          <p class="font-body text-sm leading-relaxed text-aesop-text-body mb-10 whitespace-pre-wrap">
            {{ text }}
          </p>

          <div v-if="primaryLabel || secondaryLabel" class="flex flex-col gap-3">
            <button
              v-if="primaryLabel"
              type="button"
              class="w-full py-3 px-6 border border-aesop-text-main bg-transparent text-aesop-text-main font-body text-sm tracking-wide transition-colors duration-200 hover:bg-aesop-bg-product"
              @click="emit('primaryClick')"
            >
              {{ primaryLabel }}
            </button>
            <button
              v-if="secondaryLabel"
              type="button"
              class="w-full py-3 px-6 border border-aesop-text-main bg-aesop-text-main text-white font-body text-sm tracking-wide transition-colors duration-200 hover:bg-[#1a1a1a]"
              @click="emit('secondaryClick')"
            >
              {{ secondaryLabel }}
            </button>
          </div>
        </div>
      </div>

      <!-- Track (3/5 remaining) -->
      <div
        ref="trackRef"
        class="w-3/5 flex gap-4 overflow-x-auto scrollbar-hide py-2 pr-2"
        :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
        @scroll="updateScrollState"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <!-- Product cards -->
        <ProductCard
          v-for="(product, index) in products"
          :key="index"
          class="carousel-card"
          :tag="product.tag"
          :image="product.image"
          :image-alt="product.imageAlt"
          :name="product.name"
          :description="product.description"
        />
      </div>

      <!-- Arrow left -->
      <Transition name="arrow-fade">
        <button
          v-if="isHovered && canScrollLeft"
          type="button"
          aria-label="Défiler vers la gauche"
          class="absolute left-[40%] top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center bg-aesop-text-main text-white transition-opacity duration-200 hover:opacity-90 z-10"
          @click="scrollBy(-1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </Transition>

      <!-- Arrow right -->
      <Transition name="arrow-fade">
        <button
          v-if="isHovered && canScrollRight"
          type="button"
          aria-label="Défiler vers la droite"
          class="absolute right-0 top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center bg-aesop-text-main text-white transition-opacity duration-200 hover:opacity-90 z-10"
          @click="scrollBy(1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </Transition>
    </div>

    <!-- Timeline / progress bar -->
    <div class="px-8 py-6">
      <div class="relative w-full h-[2px] bg-aesop-text-disabled opacity-70">
        <div
          class="absolute top-0 left-0 h-full bg-aesop-text-main transition-all duration-150 ease-out"
          :style="{
            width: '20%',
            left: `${scrollProgress * 80}%`,
          }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Card width: 2 full + 70% of 3rd visible within the track
   Track has gap-4 (1rem), so 2 gaps between 2.7 cards
   width = (100% - 2 * 1rem) / 2.7 */
.carousel-card {
  width: calc((100% - 2rem) / 2.7) !important;
  min-width: 180px;
}

/* Hide scrollbar across browsers */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Arrow fade transition */
.arrow-fade-enter-active,
.arrow-fade-leave-active {
  transition: opacity 0.2s ease;
}
.arrow-fade-enter-from,
.arrow-fade-leave-to {
  opacity: 0;
}
</style>
