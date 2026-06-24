<script setup lang="ts">
// Footer component
</script>

<template>
  <footer class="bg-[#252525] text-[#fffef2] font-body text-sm pt-12 pb-6 px-6 lg:px-10 w-full mt-16">
    <!-- Main content container -->
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">
      
      <!-- Newsletter & Sustainability (takes full width on mobile, ~40% on desktop) -->
      <div class="w-full lg:w-2/5 flex flex-col gap-12">
        <!-- Newsletter -->
        <div>
          <h3 class="font-body font-medium mb-4 pb-4 border-b border-white">Abonnez-vous aux communications Aesop</h3>
          <div class="relative mb-4">
            <input 
              type="email" 
              placeholder="Email adresse" 
              class="w-full bg-transparent border border-white rounded-none py-2.5 px-3 text-[#fffef2] placeholder-white/70 focus:outline-none focus:border-white transition-colors" 
            />
            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors" aria-label="S'abonner">
              <span class="text-lg leading-none">→</span>
            </button>
          </div>
          <div class="flex items-start gap-3">
            <input 
              type="checkbox" 
              id="newsletter" 
              class="mt-1 appearance-none w-3.5 h-3.5 border border-white rounded-sm checked:bg-white checked:border-white cursor-pointer transition-colors shrink-0 flex items-center justify-center relative after:content-[''] after:absolute after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-[#252525] after:rotate-45 after:-mt-1 checked:after:block after:hidden" 
            />
            <label for="newsletter" class="text-sm text-white/90 leading-relaxed cursor-pointer">
              Abonnez-vous pour recevoir des communications d'Aesop. En vous abonnant, vous confirmez que vous avez lu et compris notre <a href="#" class="underline hover:text-white transition-colors">politique de confidentialité</a>.
            </label>
          </div>
        </div>

        <!-- Sustainability -->
        <div>
          <h3 class="font-body font-medium mb-4 pb-4 border-b border-white">Développement durable</h3>
          <p class="text-sm text-white/90 leading-relaxed mb-4">
            Tous les produits Aesop sont vegan ; nous ne testons aucun d'entre eux (ni aucun de leurs ingrédients) sur les animaux. Nous détenons les certifications Leaping Bunny et B Corp. <br class="hidden xl:block" />
            <a href="#" class="underline hover:text-white transition-colors">En savoir plus</a>
          </p>
        </div>
      </div>

      <!-- Links (2 columns on mobile, 3 on desktop) -->
      <div class="w-full lg:w-3/5 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        
        <!-- Column 1 -->
        <div class="flex flex-col gap-12">
          <div>
            <h3 class="font-body font-medium mb-4 pb-4 border-b border-white">Commandes et assistance</h3>
            <ul class="flex flex-col gap-4 text-sm text-[#fffef2]">
              <li><a href="#" class="hover:opacity-70 transition-opacity flex items-center gap-1.5">Nous contacter <span class="text-[10px]">↗</span></a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity flex items-center gap-1.5">FAQs <span class="text-[10px]">↗</span></a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity flex items-center gap-1.5">Livraison et retours <span class="text-[10px]">↗</span></a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Historique des commandes</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity flex items-center gap-1.5">Suivre votre commande <span class="text-[10px]">↗</span></a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Solde de votre carte-cadeau</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Conditions générales de vente</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-body font-medium mb-4 pb-4 border-b border-white">À propos d'Aesop</h3>
            <ul class="flex flex-col gap-4 text-sm text-[#fffef2]">
              <li><a href="#" class="hover:opacity-70 transition-opacity">À propos</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">La Fondation Aesop</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Carrières</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Politique de confidentialité</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Énoncé d'accessibilité</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Politique relative aux cookies</a></li>
            </ul>
          </div>
        </div>

        <!-- Column 2 -->
        <div class="flex flex-col gap-12">
          <div>
            <h3 class="font-body font-medium mb-4 pb-4 border-b border-white">Services</h3>
            <ul class="flex flex-col gap-4 text-sm text-[#fffef2]">
              <li><a href="#" class="hover:opacity-70 transition-opacity">Retrait en boutique</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Assistance en Direct</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Soins Visage sur Rendez-Vous</a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity">Cadeaux d'entreprise</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-body font-medium mb-4 pb-4 border-b border-white">Réseaux sociaux</h3>
            <ul class="flex flex-col gap-4 text-sm text-[#fffef2]">
              <li><a href="#" class="hover:opacity-70 transition-opacity flex items-center gap-1.5">Instagram <span class="text-[10px]">↗</span></a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity flex items-center gap-1.5">Twitter <span class="text-[10px]">↗</span></a></li>
              <li><a href="#" class="hover:opacity-70 transition-opacity flex items-center gap-1.5">LinkedIn <span class="text-[10px]">↗</span></a></li>
            </ul>
          </div>
        </div>

        <!-- Column 3 -->
        <div class="flex flex-col gap-12 col-span-2 lg:col-span-1">
          <div>
            <h3 class="font-body font-medium mb-4 pb-4 border-b border-white">Préférences de localisation</h3>
            <div class="flex flex-col gap-6 text-sm text-[#fffef2]">
              <div>
                <p class="font-body font-medium mb-3">Livraison :</p>
                <a href="#" class="underline hover:opacity-70 transition-opacity">France</a>
              </div>
              <div>
                <p class="font-body font-medium mb-3">Langue :</p>
                <ul class="flex flex-col gap-2">
                  <li><a href="#" class="underline hover:opacity-70 transition-opacity">Français</a></li>
                  <li><a href="#" class="hover:opacity-70 transition-opacity">English</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <!-- Bottom -->
    <div class="pt-6 border-t border-white flex justify-between items-center relative">
      <span class="text-[#fffef2] text-[15px] font-body font-medium">© Aesop</span>
      <!-- Optionnel: bouton message chat comme sur la capture -->
      <button class="absolute -top-6 right-0 bg-[#333] hover:bg-[#444] transition-colors border border-white rounded-full w-12 h-12 flex items-center justify-center -mt-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  </footer>
</template>
