<script setup lang="ts">
const pageSections = [
  { key: 'philosophie', label: 'Philosophie' },
  { key: 'rituels', label: 'Rituels' },
  { key: 'ingredients', label: 'Ingrédients' },
  { key: 'lecture', label: 'Lecture' },
]

const activeSection = ref('philosophie')
</script>

<template>
  <section class="relative pt-20">
    <PageHero
      title="Votre étagère"
      text="Une anthologie de vos produits favoris—conservés ici afin de les retrouver facilement à tout moment."
      image="/images/hero_bg.webp"
    />

    <SubNav v-model="activeSection" :sections="pageSections" />

    <Transition name="section-fade" mode="out-in">
      <article
        v-if="activeSection === 'philosophie'"
        key="philosophie"
        class="page-section"
        role="tabpanel"
      >
        <h2>Philosophie</h2>
        <p>
          Une approche du soin fondée sur la recherche botanique,
          l'attention au détail et le respect des matières.
        </p>
      </article>

      <article
        v-else-if="activeSection === 'rituels'"
        key="rituels"
        class="page-section"
        role="tabpanel"
      >
        <h2>Rituels</h2>
        <p>
          Chaque geste du quotidien peut devenir un moment de calme
          et de présence à soi.
        </p>
      </article>

      <article
        v-else-if="activeSection === 'ingredients'"
        key="ingredients"
        class="page-section"
        role="tabpanel"
      >
        <h2>Ingrédients</h2>
        <p>
          Sélectionnés pour leur efficacité et leur origine,
          nos ingrédients témoignent d'un engagement envers la qualité.
        </p>
      </article>

      <article
        v-else-if="activeSection === 'lecture'"
        key="lecture"
        class="page-section"
        role="tabpanel"
      >
        <h2>Lecture</h2>
        <p>
          Des textes choisis pour accompagner le temps qui passe,
          entre réflexion et contemplation.
        </p>
      </article>
    </Transition>
  </section>
</template>

<style scoped>
.page-section {
  padding: 6rem 2rem;
  min-height: 80vh;
}

.page-section h2 {
  font-family: var(--font-title);
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-main);
}

.page-section p {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-body);
  max-width: 36rem;
}

.section-fade-enter-active,
.section-fade-leave-active {
  transition: opacity 0.25s ease;
}

.section-fade-enter-from,
.section-fade-leave-to {
  opacity: 0;
}
</style>

