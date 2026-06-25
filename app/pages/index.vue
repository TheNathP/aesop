<script setup lang="ts">
const { isRoutineValidated, routineSelectedProducts } = useRoutineState()

const pageSections = computed(() => [
  { key: 'coups-de-coeur', label: 'Voir vos coups de coeur' },
  { key: 'produits', label: 'Vos produits' },
  { key: 'routines', label: 'Vos routines', disabled: !isRoutineValidated.value },
])

const route = useRoute()

const activeSection = ref('coups-de-coeur')

onMounted(() => {
  if (route.query.view === 'details-routine') {
    if (isRoutineValidated.value) {
      activeSection.value = 'details-routine'
    } else {
      activeSection.value = 'coups-de-coeur'
      // Optionally clean up the URL to remove ?view
      navigateTo('/', { replace: true })
    }
  }
})

const navigateToGuideCadeaux = () => {
  navigateTo('/creation-de-routine')
}

const highlightProductData = {
  header: 'Formulation Phare',
  title: 'Le Sérum Hydratant Triple Infusion',
  text: 'Une formule légère enrichie en vitamines B et C pour hydrater intensément et équilibrer la peau au quotidien.',
  primaryLabel: 'Découvrir la formulation',
  secondaryLabel: 'Ajouter à mes favoris',
  image: '/images/hero_bg.webp'
}

const routinesCarouselProducts = computed(() => {
  return carouselProducts.filter(p => routineSelectedProducts.value.includes(p.name))
})

const routinesHighlightData = {
  header: '',
  title: 'Commencez un nouveau chapitre',
  text: 'Comme un recit qui evolue au fil des chapitres, votre routine peut changer selon le moment de la journee, la saison ou les besoins de votre peau et de vos cheveux. Soin du visage, du corps ou de la chevelure : adaptez chaque geste pour offrir a votre peau le soin dont elle a besoin, matin apres matin et saison apres saison',
  primaryLabel: 'Créer une nouvelle routine',
  image: '/images/illu1.webp'
}

const routinesStepsData = {
  step1: {
    image: '/images/drop1.webp',
    productName: 'Gel Nettoyant Etonnant pour le Visage',
    instruction: 'Matin et soir, versez sur mains propres et faites mousser. Appliquez en massage sur le visage et le cou, puis rincez soigneusement à l\'eau chaude.',
    doseLabel: 'Dose a appliquer',
    doseValue: 'Une demi-cuilleree a cafe'
  },
  step2: {
    image: '/images/drop2.webp',
    productName: 'Toner Astringent a l\'Orange Amere',
    instruction: 'Après le nettoyage, versez directement entre vos paumes ou sur un disque en coton réutilisable, et faire pénétrer par tapotements sur le visage et le cou.',
    doseLabel: 'Dose a appliquer',
    doseValue: 'Une demi-cuilleree a cafe'
  }
}

const additionalSteps = computed(() => {
  return routinesCarouselProducts.value.slice(2).map(product => ({
    image: '/images/drop3.webp',
    productName: product.name,
    instruction: 'Appliquez selon vos besoins, en adaptant la quantité à l\'état de votre peau.',
    doseLabel: 'Dose recommandée',
    doseValue: 'Une petite quantité'
  }))
})

const detailsHighlightData = {
  header: 'Un pilier pour soutenir votre routine',
  title: 'Sérum Hydratant Léger pour le Visage',
  text: 'Apres avoir tourne les pages du nettoyage et de la purification avec le Gel Nettoyant Etonnant et le Toner Astringent a l\'Orange Amere, ce Serum Hydratant Leger vient conclure l\'histoire en apportant a la peau une hydratation douce et equilibree. Enrichi en Aloe Vera apaisant et en Ylang-Ylang equilibrant, il offre un fini mat et confortable, pour une peau fraiche, souple et parfaitement preparee a ecrire une nouvelle journee.',
  primaryLabel: 'Voir le produit &rarr;',
  secondaryLabel: 'Tester en magasin &rarr;',
  image: '/images/illu1.webp'
}
</script>

<template>
  <section class="relative pt-20">
    <PageHero
      title="Votre étagère"
      text="Une anthologieé de vos produits favoris—conservés ici afin de les retrouver facilement à tout moment."
      image="/images/hero_bg.webp"
    />

    <SubNav v-model="activeSection" :sections="pageSections" />

    <Transition name="section-fade" mode="out-in">
      <article
        v-if="activeSection === 'coups-de-coeur'"
        key="coups-de-coeur"
        class="page-section page-section--flush"
        role="tabpanel"
      >
        <!-- Vue vide : coups de coeur -->
      </article>

      <article
        v-else-if="activeSection === 'produits'"
        key="produits"
        class="page-section page-section--flush"
        role="tabpanel"
      >
        <ProductCarousel
          header="Les soins du Visage"
          title="Révélez l'éclat de votre visage"
          text="Les premiers gestes d'une routine réfléchie, destinés à préparer, équilibrer et accompagner la peau au quotidien."
          :products="visageProducts"
          primary-label="Créer une routine &rarr;"
          @primary-click="navigateToGuideCadeaux"
        />

        <ProductCarousel
          header="Les soins Mains et Corps"
          title="Rythmez vos gestes au quotidien"
          text="Des formulations conçues pour les usages quotidiens du corps, où efficacité et expérience sensorielle avancent de concert."
          :products="corpsProducts"
          class="mt-12"
        />
      </article>

      <article
        v-else-if="activeSection === 'routines'"
        key="routines"
        class="page-section page-section--flush"
        role="tabpanel"
      >
        <ProductCarousel
          header="Routine Visage du matin"
          title="Le soleil se lève, une nouvelle page s'écrit"
          text="Offrez a votre peau quelques instants de douceur avec cette routine du matin. Nettoyez, equilibrez, hydratez : trois gestes simples pour reveiller l'eclat naturel de votre teint et commencer la journee avec une peau fraiche, confortable et prete a affronter chaque nouveau chapitre."
          :products="routinesCarouselProducts"
          primary-label="Ajouter un nouveau produit &rarr;"
          secondary-label="Voir ma routine &rarr;"
          @primary-click="navigateTo('/ajouter-produit')"
          @secondary-click="activeSection = 'details-routine'"
        />
        <ProductHighlight
          :header="routinesHighlightData.header"
          :title="routinesHighlightData.title"
          :text="routinesHighlightData.text"
          :primary-label="routinesHighlightData.primaryLabel"
          :image="routinesHighlightData.image"
          class="mt-12 border-t border-aesop-text-disabled/20"
        />
      </article>

      <article
        v-else-if="activeSection === 'details-routine'"
        key="details-routine"
        class="page-section page-section--flush"
        role="tabpanel"
      >
        <SectionHeader
          title="Votre routine personnalisée"
          text="Des gestes réfléchis, destinés à préparer, équilibrer et accompagner la peau au quotidien."
        />
        <RitualSteps
          :step1="routinesStepsData.step1"
          :step2="routinesStepsData.step2"
        />
        <RitualSteps
          v-for="(step, index) in additionalSteps"
          :key="index"
          :step1="step"
        />

        <QuoteBlock v-if="routinesCarouselProducts.length === 3" />

        <ProductHighlight
          v-else
          :header="detailsHighlightData.header"
          :title="detailsHighlightData.title"
          :text="detailsHighlightData.text"
          :primary-label="detailsHighlightData.primaryLabel"
          :secondary-label="detailsHighlightData.secondaryLabel"
          :image="detailsHighlightData.image"
          class="mt-12 border-t border-aesop-text-disabled/20"
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

