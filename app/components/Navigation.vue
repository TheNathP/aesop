<script setup lang="ts">
const { isNavHidden, setHidden } = useNavState()
const isHidden = isNavHidden
let lastScrollY = 0

function onScroll() {
  const currentScrollY = window.scrollY
  const hidden = currentScrollY > lastScrollY && currentScrollY > 80
  setHidden(hidden)
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
    <nav
        :class="[
            'fixed top-0 left-0 right-0 z-50 flex justify-between items-center gap-4 w-full h-20 bg-aesop-bg-general font-body text-sm p-8 transition-transform duration-300',
            isHidden ? '-translate-y-full' : 'translate-y-0'
        ]"
    >
        <div class="flex gap-4">
            <p>Nouveautés & Incontournables</p>
            <p>Visage</p>
            <p>Mains et Corps</p>
            <p>Maison</p>
            <p>Cheveux</p>
            <p>Parfums</p>
            <p>Coffrets et voyage</p>
            <p>Cadeaux</p>
            <p>Inspiration</p>
            <p>Points de vente</p>
            <p>Soins Visage sur Rendez-Vous</p>
            <svg aria-labelledby="search-:r17:" focusable="false" height="18" role="img" tabindex="-1" viewBox="0 0 16 16" width="18" style="height: 18px; width: 18px;"><title id="search-:r17:">search</title><g><path d="M11.9544 10.8246C12.8838 9.65831 13.3941 8.18223 13.3941 6.68793C13.3941 3.00683 10.3872 0 6.68793 0C2.98861 0 0 3.00683 0 6.68793C0 10.369 3.00683 13.3759 6.68793 13.3759C8.16401 13.3759 9.64009 12.8656 10.8246 11.9362L14.8519 15.9636L16 14.8155L11.9544 10.8246ZM6.68793 11.7904C3.89977 11.7904 1.62187 9.51253 1.62187 6.72437C1.62187 3.93622 3.89977 1.65831 6.68793 1.65831C9.47608 1.65831 11.754 3.93622 11.754 6.72437C11.754 9.51253 9.47608 11.7904 6.68793 11.7904Z"></path></g></svg>
        </div>
        <div class="flex gap-4">
            <p>Se connecter</p>
            <p>Etagere</p>
            <p>Panier</p>
        </div>
    </nav>
</template>


