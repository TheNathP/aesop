<script setup lang="ts">
const route = useRoute()
const showGlobalLayout = computed(() => !['/creation-de-routine', '/ajouter-produit', '/creation-seconde-routine'].includes(route.path))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-aesop-bg-general">
    <NuxtRouteAnnouncer />
    <Navigation v-if="showGlobalLayout" />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <Footer v-if="showGlobalLayout" />
  </div>
</template>
