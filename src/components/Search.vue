<template>
  <div class="flex justify-center items-center mb-10">
    <Betashares />
  </div>
  <form class="flex items-center gap-2 w-full transition-all">
    <div class="rounded-xl h-10 px-2 bg-white w-full flex items-center gap-2 space-between overflow-hidden transition-all" :class="{ 'rounded-b-none': hasCompletedSearch }">
      <input type="text" v-model="searchText" class="w-full focus:outline-none pl-3 h-5 transition-all" placeholder="Search the site by ASX code, fund name, phrase or topic" />
      <LoadingSpinner v-show="isLoading" />
      <ClearButton v-show="searchText.length > 0" @click.prevent="handleClearButton" />
    </div>
    <Transition name="grow">
      <button type="submit" class="p-2 rounded-full bg-primary text-white hover:text-black transition-all duration-300 size-10" v-show="searchText.length === 0">
        <SearchIcon />
      </button>
    </Transition>
  </form>

  <Transition name="slide">
    <div class="" data-id="filtersAndResults" v-if="hasCompletedSearch">
      <!-- Filters -->
      <!-- <FilterBar @update:filters="updateFilters" /> -->
      <!-- results -->
      <div class="flex flex-col " data-id="results">
        <div class="bg-white  max-h-[390px] overflow-y-auto" :class="{ 'rounded-b-xl': searchResults.count === 0 }">
          <ul class="flex  flex-col divide-y" v-if="searchResults.count > 0">
            <SearchItem v-for="result in searchResults.results" :key="result.symbol_openfigi" :result="result" :is-loading="isLoading" />
          </ul>
          <div class="flex gap-2 flex-col p-4" v-else>
            <h4 class="text-sm uppercase">No results found</h4>
            <p class="text-sm">Please try searching for something else or remove some filters</p>
          </div>
        </div>
        <div class="bg-white flex flex-col gap-y-2 px-4 rounded-b-xl" v-if="searchResults.count > 0">
          <div class="py-1 flex gap-x-1 items-center overflow-x-auto" v-if="totalPages > 1">
            <button class="size-6 text-xs rounded-full" v-for="page in totalPages" :class="{ 'bg-secondary text-black': page !== activePage, 'bg-primary text-white': page === activePage }" :key="page" @click="handlePageClick(page)">{{ page }}</button>
          </div>
          <div>Showing {{ activePage * pageSize - pageSize + 1 }} - {{ Math.min(activePage * pageSize, searchResults.count) }} of {{ searchResults.count }} results</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSearch } from '../composables/useSearch'

import ClearButton from './ui/ClearButton.vue'
import SearchIcon from '../svg/SearchIcon.vue'
import Betashares from '../svg/betashares.vue'
import LoadingSpinner from './ui/LoadingSpinner.vue'
import SearchItem from './SearchItem.vue'

import FilterBar from './FilterBar.vue'

import { useDebounceFn } from '@vueuse/core'
const searchText = ref('')
const searchFilters = ref({})
const activePage = ref(1)
const pageSize = ref(10)

const { searchResultsData, isLoading, hasCompletedSearch, clearResults, startSearch } = useSearch()

const searchResults = computed(() => {
  return searchResultsData.value
})

const totalPages = computed(() => {
  return Math.ceil(searchResults.value.count / pageSize.value)
})


watch([searchText], ([prevSearchText], [newSearchText]) => {
  if (searchText.value.length < 2) return

  if (prevSearchText !== newSearchText) {
    activePage.value = 1
  }

  debounceSearch()
})

const debounceSearch = () => {
  if (searchText.value.length < 2) return
  isLoading.value = true

  performSearch()
}

const performSearch = useDebounceFn(() => {
  startSearch(searchText.value, activePage.value, searchFilters.value)
}, 550)

const updateFilters = (filters: object) => {
  searchFilters.value = filters
  debounceSearch()
}

const handlePageClick = (page: number) => {
  activePage.value = page
  debounceSearch()
}

const handleClearButton = () => {
  searchText.value = ''
  searchFilters.value = {}
  clearResults()
}

</script>

<style scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.grow-enter-active,
.grow-leave-active,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.grow-enter-from,
.grow-leave-to {
  opacity: 0;
  transform: scale(0.4);
}

.grow-enter-to,
.grow-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
