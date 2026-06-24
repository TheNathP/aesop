<script setup lang="ts">
const { isNavHidden, setHidden } = useNavState()
const isHidden = isNavHidden
const isBurgerOpen = ref(false)
let lastScrollY = 0

function onScroll() {
  const currentScrollY = window.scrollY
  const hidden = currentScrollY > lastScrollY && currentScrollY > 80
  setHidden(hidden)
  lastScrollY = currentScrollY
}

function toggleBurger() {
  isBurgerOpen.value = !isBurgerOpen.value
}

function closeBurger() {
  isBurgerOpen.value = false
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
      'fixed top-0 left-0 right-0 z-50 flex justify-between items-center gap-4 w-full h-20 bg-aesop-bg-general font-body text-sm px-5 md:px-8 transition-transform duration-300',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <!-- Left: Logo (mobile) / Links (desktop) -->
    <div class="hidden md:flex gap-4">
      <p>Nouveautés &amp; Incontournables</p>
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
      <svg aria-labelledby="search-desktop" focusable="false" height="18" role="img" tabindex="-1" viewBox="0 0 16 16" width="18" style="height: 18px; width: 18px;">
        <title id="search-desktop">search</title>
        <g><path d="M11.9544 10.8246C12.8838 9.65831 13.3941 8.18223 13.3941 6.68793C13.3941 3.00683 10.3872 0 6.68793 0C2.98861 0 0 3.00683 0 6.68793C0 10.369 3.00683 13.3759 6.68793 13.3759C8.16401 13.3759 9.64009 12.8656 10.8246 11.9362L14.8519 15.9636L16 14.8155L11.9544 10.8246ZM6.68793 11.7904C3.89977 11.7904 1.62187 9.51253 1.62187 6.72437C1.62187 3.93622 3.89977 1.65831 6.68793 1.65831C9.47608 1.65831 11.754 3.93622 11.754 6.72437C11.754 9.51253 9.47608 11.7904 6.68793 11.7904Z"></path></g>
      </svg>
    </div>

    <!-- Mobile left: Logo -->
    <div class="flex md:hidden items-center">
      <img
        src="~/assets/logo/logo.svg"
        alt="Aēsop"
        class="h-5"
      />
    </div>

    <!-- Mobile right: search, heart, panier, burger -->
    <div class="flex md:hidden items-center gap-5">
      <!-- Search icon -->
      <button type="button" aria-label="Rechercher" class="bg-transparent border-none p-0 cursor-pointer">
        <svg focusable="false" height="18" role="img" tabindex="-1" viewBox="0 0 16 16" width="18" style="height: 18px; width: 18px;" aria-hidden="true">
          <g><path d="M11.9544 10.8246C12.8838 9.65831 13.3941 8.18223 13.3941 6.68793C13.3941 3.00683 10.3872 0 6.68793 0C2.98861 0 0 3.00683 0 6.68793C0 10.369 3.00683 13.3759 6.68793 13.3759C8.16401 13.3759 9.64009 12.8656 10.8246 11.9362L14.8519 15.9636L16 14.8155L11.9544 10.8246ZM6.68793 11.7904C3.89977 11.7904 1.62187 9.51253 1.62187 6.72437C1.62187 3.93622 3.89977 1.65831 6.68793 1.65831C9.47608 1.65831 11.754 3.93622 11.754 6.72437C11.754 9.51253 9.47608 11.7904 6.68793 11.7904Z"></path></g>
        </svg>
      </button>

      <!-- Heart icon (Étagère) -->
      <button type="button" aria-label="Étagère" class="bg-transparent border-none p-0 cursor-pointer">
        <svg focusable="false" height="18" width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <!-- Panier (text) -->
      <span class="font-body text-sm text-aesop-text-main">Panier</span>

      <!-- Burger button -->
      <button
        type="button"
        :aria-label="isBurgerOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        :aria-expanded="isBurgerOpen"
        class="relative bg-transparent border-none p-0 cursor-pointer w-5 h-5 flex flex-col justify-center items-center gap-[5px]"
        @click="toggleBurger"
      >
        <span
          :class="[
            'block w-5 h-[1.5px] bg-aesop-text-main transition-all duration-300 origin-center',
            isBurgerOpen ? 'rotate-45 translate-y-[3.25px]' : ''
          ]"
        />
        <span
          :class="[
            'block w-5 h-[1.5px] bg-aesop-text-main transition-all duration-300 origin-center',
            isBurgerOpen ? '-rotate-45 -translate-y-[3.25px]' : ''
          ]"
        />
      </button>
    </div>

    <!-- Desktop right -->
    <div class="hidden md:flex gap-4">
      <p>Se connecter</p>
      <p>Etagere</p>
      <p>Panier</p>
    </div>

    <!-- Mobile burger menu -->
    <Transition name="burger-slide">
      <div
        v-if="isBurgerOpen"
        class="md:hidden absolute top-20 left-0 right-0 bg-aesop-bg-general border-t border-aesop-text-disabled/20 flex flex-col px-5 py-6 gap-4 font-body text-sm text-aesop-text-main"
      >
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Nouveautés &amp; Incontournables</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Visage</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Mains et Corps</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Maison</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Cheveux</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Parfums</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Coffrets et voyage</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Cadeaux</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Inspiration</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Points de vente</button>
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Soins Visage sur Rendez-Vous</button>
        <hr class="border-aesop-text-disabled/20 w-full" />
        <button type="button" class="text-left bg-transparent border-none p-0 cursor-pointer" @click="closeBurger">Se connecter</button>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.burger-slide-enter-active,
.burger-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.burger-slide-enter-from,
.burger-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
