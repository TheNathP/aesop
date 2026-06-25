<script setup lang="ts">
interface Props {
  title: string
  text: string
}

defineProps<Props>()
</script>

<template>
  <header class="w-full flex items-center px-[60px] py-[60px]">
    <!-- Bloc gauche — titre aligné à droite -->
    <div class="w-1/2 pr-10 flex">
      <h2 class="font-title text-[2rem] lg:text-[2.5rem] text-aesop-text-main leading-snug text-right">
        {{ title }}
      </h2>
    </div>

    <!-- Bloc droit — texte aligné à gauche -->
    <div class="w-1/2 ">
      <p class="font-body text-sm text-aesop-text-body leading-relaxed max-w-[32rem]">
        {{ text }}
      </p>
    </div>
  </header>
</template>
