<script setup lang="ts">
const route = useRoute()
const showNavigation = computed(() => route.path !== '/guide-cadeaux')
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Navigation v-if="showNavigation" />
    <NuxtPage />
  </div>
</template>
