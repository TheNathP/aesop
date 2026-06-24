<script setup lang="ts">
const route = useRoute()
const showGlobalLayout = computed(() => route.path !== '/guide-cadeaux')
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NuxtRouteAnnouncer />
    <Navigation v-if="showGlobalLayout" />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <Footer v-if="showGlobalLayout" />
  </div>
</template>
