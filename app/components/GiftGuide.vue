<script setup lang="ts">
interface Step {
  question: string
  options: string[]
}

interface CardOption {
  title: string
  image: string
}

interface CardStep {
  question: string
  cards: CardOption[]
}

const steps: Step[] = [
  {
    question: 'Quelle est la raison de ce cadeau ?',
    options: [
      'Pour exprimer sa gratitude',
      'Exprimer de l\'affection ou de l\'admiration',
      'Pour faire naître un sourire complice',
    ],
  },
  {
    question: 'À qui est destiné ce cadeau ?',
    options: [
      'Un proche',
      'Un collègue',
      'Un ami',
      'Pour soi-même',
    ],
  },
  {
    question: 'Quel univers olfactif préférez-vous ?',
    options: [
      'Boisé et terreux',
      'Floral et délicat',
      'Herbacé et frais',
      'Agrumes et vivifiant',
    ],
  },
]

const lastStep: CardStep = {
  question: 'Quelle gamme vous inspire ?',
  cards: [
    { title: 'Soins pour le visage', image: '/images/philosophy_1.png' },
    { title: 'Mains et corps', image: '/images/philosophy_2.png' },
    { title: 'Parfums d\'intérieur', image: '/images/philosophy_3.png' },
  ],
}

const totalSteps = steps.length + 1
const currentStep = ref(0)
const answers = ref<string[]>([])

const isLastStep = computed(() => currentStep.value === totalSteps - 1)
const currentQuestion = computed(() => {
  if (isLastStep.value) return lastStep.question
  return steps[currentStep.value]?.question || ''
})

function selectOption(option: string) {
  answers.value[currentStep.value] = option
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++
  }
}

function goBack() {
  if (currentStep.value > 0) {
    currentStep.value--
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

      <span class="font-body text-sm text-aesop-text-main">Guide cadeaux</span>
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
          <h2 class="font-title text-[1.25rem] md:text-[1.625rem] text-center text-aesop-text-main mb-10 leading-snug">
            {{ currentQuestion }}
          </h2>

          <!-- Standard options (steps 1-3): always on one line on desktop -->
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
                answers[currentStep] === option
                  ? 'border-aesop-text-main bg-aesop-bg-product'
                  : 'border-[#999999]'
              ]"
              @click="selectOption(option)"
            >
              {{ option }}
            </button>
          </div>

          <!-- Card options (last step) -->
          <div v-else class="flex flex-col items-center gap-6 w-full sm:flex-row sm:flex-wrap sm:justify-center">
            <button
              v-for="card in lastStep.cards"
              :key="card.title"
              type="button"
              :class="[
                'flex flex-col items-center bg-transparent border border-solid cursor-pointer p-0 w-full max-w-[16rem] sm:w-56 sm:max-w-none transition-[border-color] duration-200 hover:border-aesop-text-disabled',
                answers[currentStep] === card.title
                  ? 'border-aesop-text-main'
                  : 'border-transparent'
              ]"
              @click="selectOption(card.title)"
            >
              <div class="w-full aspect-[3/4] overflow-hidden bg-aesop-bg-product rounded-sm">
                <img
                  :src="card.image"
                  :alt="card.title"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span class="font-body text-sm text-aesop-text-main text-center py-4 px-2">
                {{ card.title }}
              </span>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Decorative images (steps 1-3 only) -->
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
    <footer class="flex justify-between items-center px-6 py-4 shrink-0">
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
