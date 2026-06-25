<script setup lang="ts">
const pageSections = [
  { key: 'philosophie', label: 'Philosophie' },
  { key: 'rituels', label: 'Rituels' },
  { key: 'ingredients', label: 'Ingrédients' },
  { key: 'lecture', label: 'Lecture' },
]

const activeSection = ref('philosophie')

const philosophySlides = [
  {
    image: '/images/philosophy_1.png',
    alt: 'Ingrédients botaniques disposés sur papier texturé',
    citation: '« Le soin est une forme de connaissance silencieuse, transmise par le geste autant que par la matière. »',
  },
  {
    image: '/images/philosophy_2.png',
    alt: 'Mortier artisanal et herbes séchées',
    citation: '« Chaque formulation est le fruit d\'une recherche patiente — un dialogue entre la science et la terre. »',
  },
  {
    image: '/images/philosophy_3.png',
    alt: 'Flacon compte-gouttes et romarin frais',
    citation: '« La beauté réside dans l\'attention portée à ce qui est essentiel, et dans le refus du superflu. »',
  },
]

const carouselProducts = [
  {
    tag: 'Les incontournables',
    image: '/images/test_produit.webp',
    name: 'Gel Lavant Résurrection Aromatique pour les Mains',
    description: 'Un gel nettoyant doux pour les mains éreintées par le travail',
  },
  {
    tag: 'Ajout récent',
    image: '/images/test_produit.webp',
    name: 'Sérum Nourrissant pour les Mains Solais',
    description: 'Réduit l\'apparence des taches brunes',
  },
  {
    tag: 'Les incontournables',
    image: '/images/test_produit.webp',
    name: 'Baume Aromatique Résurrection pour les Lèvres',
    description: 'Arôme boisé et herbacé, aux notes d\'agrumes',
  },
  {
    tag: 'Nouveauté',
    image: '/images/test_produit.webp',
    name: 'Crème Hydratante pour le Visage',
    description: 'Une hydratation profonde et durable',
  },
]
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
        class="page-section page-section--flush"
        role="tabpanel"
      >
        <PinnedGallery :slides="philosophySlides" />
      </article>

      <article
        v-else-if="activeSection === 'rituels'"
        key="rituels"
        class="page-section page-section--flush"
        role="tabpanel"
      >
        <ProductCarousel
          title="Partenaires suggérés"
          text="Un nouveau programme rythmé pour les mains"
          :products="carouselProducts"
        />
      </article>

      <article
        v-else-if="activeSection === 'ingredients'"
        key="ingredients"
        class="page-section page-section--flush"
        role="tabpanel"
      >
        <SectionHeader
          title="Ingrédients"
          text="Sélectionnés pour leur efficacité et leur origine, nos ingrédients témoignent d'un engagement envers la qualité et le respect de la peau."
        />
      </article>

      <article
        v-else-if="activeSection === 'lecture'"
        key="lecture"
        class="page-section page-section--flush"
        role="tabpanel"
      >
        <SectionHeader
          title="Lecture"
          text="Des textes choisis pour accompagner le temps qui passe, entre réflexion et contemplation, afin d'enrichir l'esprit autant que les sens."
        />
      </article>
    </Transition>
  </section>
</template>

<style scoped>
.page-section {
  padding: 6rem 2rem;
  min-height: 80vh;
}

.page-section--flush {
  padding: 0;
  min-height: 0;
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

