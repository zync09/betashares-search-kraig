<template>
  <form class="flex items-center gap-2 w-full">
    <div class="py-5 px-4 rounded-full bg-white w-full flex items-center gap-2 space-between">
      <input type="text" v-model="searchText" class="w-full focus:outline-none pl-3" placeholder="Search the site by ASX code, fund name, phrase or topic" />
      <LoadingSpinner v-show="isLoading" />
      <ClearButton v-show="searchText.length > 0" @click.prevent="clearResults" />
    </div>
    <button type="submit" class="p-2 rounded-full bg-primary text-white hover:text-black transition-all duration-300">
      <SearchIcon />
    </button>
  </form>
  <!-- results -->
  <div class="flex flex-col gap-2" data-id="results" v-if="searchResultsData?.results?.length > 0">
    <SearchResults :searchResults="searchResultsData" />
  </div>

</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useSearch } from '../composables/Search'

import ClearButton from './ui/ClearButton.vue'
import SearchIcon from '../svg/SearchIcon.vue'
import SearchResults from './SearchResults.vue'
import LoadingSpinner from './ui/LoadingSpinner.vue'

const { searchResultsData, isLoading, startSearch, clearResults, searchText } = useSearch()

watchEffect(async () => {
  if (searchText.value.length > 0) {
    await startSearch(searchText.value)
  } else {
    clearResults()
  }
})

</script>
