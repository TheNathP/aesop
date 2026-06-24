<script setup lang="ts">
interface SectionItem {
  key: string
  label: string
}

const props = defineProps<{
  sections: SectionItem[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { isNavHidden } = useNavState()

function select(key: string) {
  emit('update:modelValue', key)
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
    <ul class="flex items-center gap-8 list-none m-0 p-0 min-h-12">
      <li
        v-for="section in sections"
        :key="section.key"
        class="shrink-0 py-3"
      >
        <button
          type="button"
          role="tab"
          :aria-selected="modelValue === section.key"
          :class="[
            'sub-nav-link relative inline-block font-body text-[0.8125rem] tracking-[0.04em] text-aesop-text-main bg-transparent border-none p-0 cursor-pointer no-underline',
            { 'is-active': modelValue === section.key }
          ]"
          @click="select(section.key)"
        >
          {{ section.label }}
        </button>
      </li>
    </ul>
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
</style>

