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
      'sub-nav',
      isNavHidden ? 'is-hidden' : ''
    ]"
    aria-label="Navigation de section"
    role="tablist"
  >
    <ul class="sub-nav__list">
      <li
        v-for="section in sections"
        :key="section.key"
        class="sub-nav__item"
      >
        <button
          type="button"
          role="tab"
          :aria-selected="modelValue === section.key"
          :class="[
            'sub-nav__link',
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
.sub-nav {
  position: sticky;
  z-index: 40;
  background-color: var(--color-bg, #EBEADE);
  padding-inline: 2rem;
  transition: top 0.3s ease-in-out;
  top: 5rem;
}

.sub-nav.is-hidden {
  top: 0;
}

.sub-nav__list {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  min-height: 3rem;
}

.sub-nav__item {
  flex-shrink: 0;
  padding-block: 0.75rem;
}

.sub-nav__link {
  position: relative;
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  color: var(--color-text-main);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
}

.sub-nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background-color: var(--color-text-main);
  transition: width 0.3s ease-in-out;
}

.sub-nav__link:hover::after,
.sub-nav__link:focus-visible::after {
  width: 100%;
}

.sub-nav__link.is-active::after {
  width: 100%;
}

.sub-nav__link:focus-visible {
  outline: 1px solid var(--color-text-main);
  outline-offset: 2px;
}
</style>
