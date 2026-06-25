<script setup lang="ts">
import { carouselProducts } from '~/utils/products'

useHead({
  title: 'Créer une routine — Aesop',
  meta: [
    { name: 'description', content: 'Créez votre seconde routine personnalisée.' },
  ],
})

const questions = [
  {
    question: 'Comme tout bon récit, une routine réussie se construit page après page. Confiez-nous les premières lignes, nous vous aiderons à écrire la suite.',
    options: ['Construire ma nouvelle routine'],
  },
  {
    question: 'Quel sera le sujet de votre prochain chapitre ?',
    options: ['Soins du visage', 'Soins des mains & du corps', 'Soins capillaires'],
  },
  {
    question: 'Comment debute votre recit capillaire ?',
    options: ['Lisse', 'Ondule', 'Boucle', 'Frise', 'Crepu'],
  },
  {
    question: 'Quel obstacle rencontre votre chevelure ?',
    options: ['Secheresse', 'Exces de sebum', 'Casse', 'Manque d\'eclat', 'Aucun en particulier'],
  },
  {
    question: 'Quelle sera la quete de ce chapitre ?',
    options: ['Nourrir', 'Reparer', 'Faire briller', 'Donner du volume', 'Dompter les frisottis'],
  },
]

const { completeSecondRoutine } = useRoutineState()

// Optionnel: si le formulaire devait juste s'arrêter après la Q5, on modifierait RoutineMaker.
// Mais pour le moment, il demande toujours une sélection finale de produits.
function handleSubmit() {
  completeSecondRoutine()
  navigateTo('/?view=routines')
}

function handleClose() {
  navigateTo('/?view=routines')
}
</script>

<template>
  <RoutineMaker
    :questions="questions"
    :hide-product-selection="true"
    @submit="handleSubmit"
    @close="handleClose"
  />
</template>
