<script setup lang="ts">
interface Step {
  image: string
  productName: string
  instruction: string
  doseLabel: string
  doseValue: string
}

interface Props {
  step1?: Step
  step2?: Step
}

defineProps<Props>()
</script>

<template>
  <div>
    <!-- Étape 1 — image à gauche, contenu à droite -->
    <section
      v-if="step1"
      class="w-full h-[90vh] flex flex-row"
    >
      <div class="w-1/2 h-full overflow-hidden">
        <img
          :src="step1.image"
          :alt="step1.productName"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div class="w-1/2 h-full flex items-center justify-center bg-aesop-bg-general">
        <div class="max-w-[580px] ">
          <p class="font-body text-sm tracking-wide text-aesop-text-main mb-6">
            Étape 1
            <span class="mx-2 text-aesop-text-disabled">●</span>
            {{ step1.productName }}
          </p>

          <p class="font-title text-[1.75rem] lg:text-[2rem] leading-snug text-aesop-text-main mb-10">
            {{ step1.instruction }}
          </p>

          <div class="w-full h-px bg-aesop-text-main mb-6" />

          <p class="font-body text-xs font-semibold tracking-wider uppercase text-aesop-text-main mb-1">
            {{ step1.doseLabel }}
          </p>
          <p class="font-body text-sm text-aesop-text-disabled">
            {{ step1.doseValue }}
          </p>
        </div>
      </div>
    </section>

    <!-- Étape 2 — image à droite, contenu à gauche (row-reverse) -->
    <section
      v-if="step2"
      class="w-full h-[90vh] flex flex-row-reverse"
    >
      <div class="w-1/2 h-full overflow-hidden">
        <img
          :src="step2.image"
          :alt="step2.productName"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div class="w-1/2 h-full flex items-center justify-center bg-aesop-bg-general">
        <div class="max-w-[580px] px-10">
          <p class="font-body text-sm tracking-wide text-aesop-text-main mb-6">
            Étape 2
            <span class="mx-2 text-aesop-text-disabled">●</span>
            {{ step2.productName }}
          </p>

          <p class="font-title text-[1.75rem] lg:text-[2rem] leading-snug text-aesop-text-main mb-10">
            {{ step2.instruction }}
          </p>

          <div class="w-full h-px bg-aesop-text-main mb-6" />

          <p class="font-body text-xs font-semibold tracking-wider uppercase text-aesop-text-main mb-1">
            {{ step2.doseLabel }}
          </p>
          <p class="font-body text-sm text-aesop-text-disabled">
            {{ step2.doseValue }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
