<script setup lang="ts">
useHead({
  title: 'Création de routine — Aesop',
  meta: [
    { name: 'description', content: 'Créez votre routine Aesop personnalisée.' },
  ],
})

// Les questions à transmettre à RoutineMaker
const questions = [
  {
    question: 'Concevoir une routine peut se révéler être un véritable casse-tête. Permettez-nous de vous aider.',
    options: [
      'Commencer ma routine personnalisée',
    ],
  },
]

const { saveRoutine } = useRoutineState()

function handleSubmit(selected: string[]) {
  saveRoutine(selected)
  navigateTo('/?view=details-routine')
}

function handleClose() {
  navigateTo('/')
}
</script>

<template>
  <RoutineMaker
    :questions="questions"
    :products="carouselProducts"
    @submit="handleSubmit"
    @close="handleClose"
  />
</template>
