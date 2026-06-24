<script setup lang="ts">
defineProps<{
  title: string
  text: string
  image: string
}>()
</script>
<template>
  <section
    class="relative w-full h-[500px] overflow-hidden"
  >
    <img
      :src="image"
      :alt="title"
      class="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
    <div class="relative z-10 flex items-center h-full px-12 pb-12">
      <div class="flex gap-16">
        <div class="flex items-start">
          <img
            src="~/assets/logo/logo.svg"
            alt="Aēsop"
            class="w-32 shrink-0"
          />
        </div>
        <div class="flex flex-col gap-3 max-w-md mt-2">
          <h1 class="font-body text-3xl leading-tight text-aesop-text-main">
            {{ title }}
          </h1>
          <p class="font-body text-base leading-relaxed text-aesop-text-main">
            {{ text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>