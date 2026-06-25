<script setup lang="ts">
import { carouselProducts } from '~/utils/products'

useHead({
  title: 'Ajouter un produit — Aesop',
  meta: [
    { name: 'description', content: 'Ajoutez un nouveau produit à votre routine Aesop.' },
  ],
})

const { routineSelectedProducts, addRoutineProducts } = useRoutineState()

const availableProducts = computed(() => {
  return carouselProducts.filter(p => !routineSelectedProducts.value.includes(p.name))
})

function handleSubmit(selected: string[]) {
  addRoutineProducts(selected)
  navigateTo('/?view=details-routine')
}

function handleClose() {
  navigateTo('/?view=details-routine')
}
</script>

<template>
  <RoutineMaker
    :products="availableProducts"
    :min-selections="1"
    @submit="handleSubmit"
    @close="handleClose"
  />
</template>
