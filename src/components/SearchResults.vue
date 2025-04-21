<template>
  <div class="bg-white p-4 rounded-2xl mt-4 max-h-[300px] overflow-y-auto">
    <ul class="flex gap-2 flex-col">
      <SearchItem v-for="result in props?.searchResults?.results" :key="result.display_name" :result="result" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ISearchResult } from '../composables/Search'
import SearchItem from './SearchItem.vue'

interface SearchResultsProps {
  searchResults: ISearchResult
}

const props = defineProps<SearchResultsProps>()
</script>
