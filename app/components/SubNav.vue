<script setup lang="ts">
interface AnchorItem {
  label: string
  href: string
}

defineProps<{
  anchors: AnchorItem[]
}>()

const { isNavHidden } = useNavState()
</script>

<template>
  <nav
    :class="[
      'sticky z-40 bg-[#EBEADE] px-8 transition-[top] duration-300 ease-in-out',
      isNavHidden ? 'top-0' : 'top-20'
    ]"
    aria-label="Navigation de section"
  >
    <ul class="flex items-center gap-8 list-none m-0 p-0 min-h-12">
      <li
        v-for="anchor in anchors"
        :key="anchor.href"
        class="shrink-0 py-3"
      >
        <a
          :href="anchor.href"
          class="relative inline-block font-body text-[0.8125rem] tracking-wide text-aesop-text-main no-underline after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-aesop-text-main after:transition-[width] after:duration-300 after:ease-in-out hover:after:w-full focus-visible:after:w-full focus-visible:outline focus-visible:outline-1 focus-visible:outline-aesop-text-main focus-visible:outline-offset-2"
        >
          {{ anchor.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
