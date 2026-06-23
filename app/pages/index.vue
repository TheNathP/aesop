<script setup lang="ts">
const pageAnchors = [
  { label: 'Philosophie', href: '#philosophie' },
  { label: 'Rituels', href: '#rituels' },
  { label: 'Ingrédients', href: '#ingredients' },
  { label: 'Lecture', href: '#lecture' },
]
</script>

<template>
  <section class="relative pt-20">
    

    <article id="philosophie" class="page-section">
      <h2>Philosophie</h2>
      <p>
        Une approche du soin fondée sur la recherche botanique,
        l'attention au détail et le respect des matières.
      </p>
    </article>

    <article id="rituels" class="page-section">
      <h2>Rituels</h2>
      <p>
        Chaque geste du quotidien peut devenir un moment de calme
        et de présence à soi.
      </p>
    </article>
    <SubNav :anchors="pageAnchors" />

    <article id="ingredients" class="page-section">
      <h2>Ingrédients</h2>
      <p>
        Sélectionnés pour leur efficacité et leur origine,
        nos ingrédients témoignent d'un engagement envers la qualité.
      </p>
    </article>

    <article id="lecture" class="page-section">
      <h2>Lecture</h2>
      <p>
        Des textes choisis pour accompagner le temps qui passe,
        entre réflexion et contemplation.
      </p>
    </article>
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
</style>
