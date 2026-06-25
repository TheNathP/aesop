<script setup lang="ts">
interface SectionItem {
  key: string
  label: string
  disabled?: boolean
}

const props = defineProps<{
  sections: SectionItem[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { isNavHidden } = useNavState()

function select(section: SectionItem) {
  if (section.disabled) return
  emit('update:modelValue', section.key)
}
</script>

<template>
  <nav
    :class="[
      'sticky z-40 bg-[#EBEADE] px-8 transition-[top] duration-300 ease-in-out',
      isNavHidden ? 'top-0' : 'top-20'
    ]"
    aria-label="Navigation de section"
    role="tablist"
  >
    <div class="sub-nav-scroll-wrapper relative">
      <ul class="flex items-center gap-8 list-none m-0 p-0 min-h-12 overflow-x-auto md:overflow-x-visible scrollbar-hide">
        <li
          v-for="section in sections"
          :key="section.key"
          class="shrink-0 py-3"
        >
          <button
            type="button"
            role="tab"
            :aria-selected="modelValue === section.key"
            :disabled="section.disabled"
            :class="[
              'sub-nav-link relative inline-block font-body text-[0.8125rem] tracking-[0.04em] p-0 cursor-pointer no-underline whitespace-nowrap bg-transparent border-none',
              section.disabled ? 'text-aesop-text-disabled cursor-not-allowed opacity-50' : 'text-aesop-text-main',
              { 'is-active': modelValue === section.key }
            ]"
            @click="select(section)"
          >
            {{ section.label }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.sub-nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background-color: var(--color-text-main);
  transition: width 0.3s ease-in-out;
}

.sub-nav-link:hover::after,
.sub-nav-link:focus-visible::after,
.sub-nav-link.is-active::after {
  width: 100%;
}

.sub-nav-link:focus-visible {
  outline: 1px solid var(--color-text-main);
  outline-offset: 2px;
}

/* Hide scrollbar across browsers */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Edge fade masks for mobile horizontal scroll */
@media (max-width: 767px) {
  .sub-nav-scroll-wrapper {
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 3%,
      black 97%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 3%,
      black 97%,
      transparent 100%
    );
  }
}
</style>
