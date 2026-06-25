<script setup lang="ts">
interface Props {
  quote?: string
  author?: string
}

withDefaults(defineProps<Props>(), {
  quote: '« Le meilleur et le plus sage des refuges contre tous vos problèmes se trouve dans la science. »',
  author: 'Ada Lovelace'
})
</script>

<template>
  <div class="w-full h-[45vh] flex flex-col items-center justify-center bg-aesop-bg-general border-t border-aesop-text-disabled/20 mt-12 px-6">
    <blockquote class="text-center max-w-3xl">
      <p class="font-title text-3xl leading-normal text-aesop-text-main mb-6">
        {{ quote }}
      </p>
      <footer class="font-body text-sm font-bold tracking-wider text-aesop-text-main">
        {{ author }}
      </footer>
    </blockquote>
  </div>
</template>
