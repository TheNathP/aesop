<script setup lang="ts">
interface Product {
  tag: string
  image: string
  imageAlt?: string
  name: string
  description: string
}

interface Props {
  title: string
  text: string
  products: Product[]
}

defineProps<Props>()

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
      class="relative overflow-hidden"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Track -->
      <div
        ref="trackRef"
        class="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-2"
        :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
        @scroll="updateScrollState"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <!-- Intro slide (inside the carousel) -->
        <div
          class="flex flex-col shrink-0 w-[calc((100%-3rem)/3.7)] min-w-[220px] px-4 pt-8 lg:pt-20"
        >
          <p
            class="font-body text-[0.6875rem] text-aesop-text-disabled uppercase tracking-widest mb-3"
          >
            {{ title }}
          </p>
          <h2
            class="font-title text-[1.5rem] lg:text-[1.625rem] text-aesop-text-main leading-snug"
          >
            {{ text }}
          </h2>
        </div>

        <!-- Product cards -->
        <ProductCard
          v-for="(product, index) in products"
          :key="index"
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
          class="absolute left-0 top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center bg-aesop-text-main text-white transition-opacity duration-200 hover:opacity-90 z-10"
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
