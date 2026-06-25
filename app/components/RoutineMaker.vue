<script setup lang="ts">
interface Step {
  question: string
  options: string[]
}

interface Product {
  tag: string
  image: string
  imageAlt?: string
  name: string
  description: string
}

interface Props {
  questions?: Step[]
  products: Product[]
  minSelections?: number
}

const props = withDefaults(defineProps<Props>(), {
  questions: () => [],
  minSelections: 2
})

const emit = defineEmits<{
  (e: 'submit', selectedProducts: string[]): void
  (e: 'close'): void
}>()

const steps = computed(() => props.questions)
const totalSteps = computed(() => steps.value.length + 1)
const currentStep = ref(0)

const singleAnswers = ref<string[]>([])
const selectedProducts = ref<string[]>([])

const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)
const currentQuestion = computed(() => {
  if (isLastStep.value) {
    if (props.minSelections === 1) return 'Choisissez le(s) produit(s) à ajouter à votre routine'
    return 'Choisissez au moins deux produits'
  }
  return steps.value[currentStep.value]?.question || ''
})

function selectSingleOption(option: string) {
  singleAnswers.value[currentStep.value] = option
  if (currentStep.value < totalSteps.value - 1) {
    currentStep.value++
  }
}

function toggleProduct(name: string) {
  if (selectedProducts.value.includes(name)) {
    selectedProducts.value = selectedProducts.value.filter(n => n !== name)
  } else {
    selectedProducts.value.push(name)
  }
}

function goBack() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function submitRoutine() {
  if (selectedProducts.value.length >= props.minSelections) {
    emit('submit', selectedProducts.value)
  }
}

const decorativeImages = [
  '/images/hero_bg.webp',
  '/images/hero_bg.webp',
  '/images/hero_bg.webp',
  '/images/hero_bg.webp',
]
</script>

<template>
  <div class="fixed inset-0 z-[100] flex flex-col bg-aesop-bg-general overflow-y-auto">
    <!-- Top bar -->
    <header class="flex justify-between items-center px-6 py-3 shrink-0">
      <Transition name="back-fade" mode="out-in">
        <button
          v-if="currentStep > 0"
          key="back-visible"
          type="button"
          class="font-body text-[0.8125rem] text-aesop-text-main bg-transparent border-0 cursor-pointer p-0 transition-opacity duration-200 hover:opacity-60"
          @click="goBack"
        >
          ← Retour
        </button>
        <span
          v-else
          key="back-hidden"
          class="font-body text-[0.8125rem] invisible pointer-events-none select-none"
          aria-hidden="true"
        >
          ← Retour
        </span>
      </Transition>

      <span class="font-body text-sm text-aesop-text-main">Création de routine</span>
      <!-- To balance the flex space-between exactly like before -->
      <button
        type="button"
        class="font-body text-[0.8125rem] text-aesop-text-main bg-transparent border-0 cursor-pointer p-0 transition-opacity duration-200 hover:opacity-60"
        @click="emit('close')"
      >
        Fermer
      </button>
    </header>

    <!-- Logo + Timeline -->
    <div class="shrink-0 px-6 relative mt-8">
      <div class="relative flex items-center justify-center">
        <!-- Logo: absolute on md+ to guarantee centered timeline -->
        <img
          src="~/assets/logo/logo.svg"
          alt="Aēsop"
          class="h-5 shrink-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2"
        />
        <!-- Timeline -->
        <div
          class="flex gap-2 w-full max-w-[16rem]"
          role="progressbar"
          :aria-valuenow="currentStep + 1"
          :aria-valuemin="1"
          :aria-valuemax="totalSteps"
        >
          <span
            v-for="i in totalSteps"
            :key="i"
            :class="[
              'flex-1 h-[2px] transition-colors duration-300',
              i - 1 <= currentStep ? 'bg-aesop-text-main' : 'bg-aesop-text-disabled'
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Question + Options -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <Transition name="step-fade" mode="out-in">
        <div :key="currentStep" class="flex flex-col items-center w-full max-w-[56rem]">
          <h2
            :class="[
              'font-title text-[1.25rem] md:text-[1.625rem] text-center text-aesop-text-main leading-snug',
              currentStep === 0 && !isLastStep ? 'border border-aesop-text-main px-8 py-10 max-w-2xl mb-12' : 'mb-10'
            ]"
          >
            {{ currentQuestion }}
          </h2>

          <!-- Standard options (steps 1-N): always on one line on desktop -->
          <div
            v-if="!isLastStep"
            class="flex flex-col items-center gap-3 w-full sm:flex-row sm:flex-nowrap sm:justify-center"
          >
            <button
              v-for="option in steps[currentStep]?.options || []"
              :key="option"
              type="button"
              :class="[
                'font-body text-sm text-aesop-text-main bg-transparent border border-solid cursor-pointer whitespace-nowrap px-8 py-3.5 transition-colors duration-200 w-full max-w-[20rem] sm:w-auto sm:max-w-none text-center hover:bg-aesop-text-main hover:text-aesop-bg-general hover:border-aesop-text-main',
                singleAnswers[currentStep] === option
                  ? 'border-aesop-text-main bg-aesop-bg-product'
                  : 'border-[#999999]'
              ]"
              @click="selectSingleOption(option)"
            >
              {{ option }}
            </button>
          </div>

          <!-- Products options (last step) -->
          <div v-else class="flex flex-col items-center w-full">
            <div class="flex flex-col items-center gap-6 w-full sm:flex-row sm:flex-wrap sm:justify-center mb-10">
              <ProductCard
                v-for="product in products"
                :key="product.name"
                :tag="product.tag"
                :image="product.image"
                :image-alt="product.imageAlt"
                :name="product.name"
                :description="product.description"
                :selected="selectedProducts.includes(product.name)"
                @click="toggleProduct(product.name)"
                class="max-w-[16rem] sm:max-w-none"
              />
            </div>

            <button
              type="button"
              :disabled="selectedProducts.length < props.minSelections"
              :class="[
                'py-3 px-8 border font-body text-sm tracking-wide transition-colors duration-200 mt-6',
                selectedProducts.length >= props.minSelections
                  ? 'border-aesop-text-main bg-aesop-text-main text-white hover:bg-[#1a1a1a] cursor-pointer'
                  : 'border-[#999999] bg-transparent text-[#999999] cursor-not-allowed opacity-50'
              ]"
              @click="submitRoutine"
            >
              Valider la routine
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Decorative images (steps 1-N only) -->
    <div v-if="!isLastStep" class="shrink-0 overflow-hidden px-4 mb-32">
      <div class="flex gap-2 origin-center scale-[1.4]">
        <img
          v-for="(src, idx) in decorativeImages"
          :key="idx"
          :src="src"
          alt=""
          class="flex-1 min-w-0 h-56 object-cover rounded"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Footer -->
    <footer class="flex justify-between items-center px-6 py-4 shrink-0 mt-auto">
      <span class="font-body text-xs text-aesop-text-body">© Aesop</span>
      <div class="flex gap-3">
        <button
          type="button"
          class="font-body text-xs text-aesop-text-main bg-transparent border-0 cursor-pointer p-0 underline underline-offset-2 transition-colors duration-200"
        >
          Français
        </button>
        <button
          type="button"
          class="font-body text-xs text-aesop-text-body bg-transparent border-0 cursor-pointer p-0 transition-colors duration-200 hover:text-aesop-text-main"
        >
          English
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Vue transition: step content fade */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.2s ease;
}
.step-fade-enter-from,
.step-fade-leave-to {
  opacity: 0;
}

/* Vue transition: back link fade */
.back-fade-enter-active,
.back-fade-leave-active {
  transition: opacity 0.25s ease;
}
.back-fade-enter-from,
.back-fade-leave-to {
  opacity: 0;
}
</style>
