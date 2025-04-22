<template>
  <button
    @click.prevent="emit('click')"
    class="py-1 font-montserrat px-2 rounded-full text-xs hover:bg-slate-500 hover:text-white bg-slate-300 text-black  transition-all duration-300 flex items-center gap-1"
  >
    <FilterIcon class="size-5" />
    <span>Filters</span>
  </button>
</template>

<script setup lang="ts">
import FilterIcon from '../../svg/filter.vue'

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
