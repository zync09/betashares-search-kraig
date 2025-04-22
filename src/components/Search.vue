<template>
  <div class="flex justify-center items-center mb-10">
    <Betashares />
  </div>
  <form class="flex items-center gap-2 w-full ">
    <div
      class="rounded-xl h-10 px-2 bg-white w-full flex items-center gap-2 space-between overflow-hidden  border-b border-b-black/20"
      :class="{ 'rounded-b-none': hasCompletedSearch }"
    >
      <input
        type="text"
        v-model="searchText"
        class="w-full focus:outline-none pl-3 h-5 "
        placeholder="Search the site by ASX code, fund name, phrase or topic"
      />
      <LoadingSpinner v-show="isLoading" />
      <FilterButton
        @click="toggleFilterBar"
        v-if="hasCompletedSearch"
      />

      <ClearButton
        v-show="searchText.length > 0"
        @click.prevent="handleClearButton"
      />
    </div>
    <button
      @click.prevent="doSearch"
      class="p-2 rounded-full bg-primary text-white hover:text-black  duration-300 size-10"
      v-show="searchText.length === 0"
    >
      <SearchIcon />
    </button>
  </form>

  <div
    data-id="filtersAndResults"
    v-if="hasCompletedSearch"
  >
    <!-- Filters -->
    <div
      class="grid transition-all duration-500 ease-in-out bg-white"
      :class="isFilterBarOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden  ">
        <FilterBar
          @update:filters="updateFilters"
          @update:sort="updateSort"
          @clearSort="clearSort"
          class="origin-top"
        />
      </div>
    </div>

    <!-- results -->
    <div
      class="flex flex-col"
      data-id="results"
    >
      <div
        class="bg-white max-h-[390px] overflow-y-auto"
        :class="{ 'rounded-b-xl': searchResults.count === 0 }"
      >
        <ul
          class="flex  flex-col divide-y"
          v-if="searchResults.count > 0"
        >
          <SearchItem
            v-for="result in searchResults.results"
            :key="result.symbol_openfigi"
            :result="result"
            :is-loading="isLoading"
          />
        </ul>
        <div
          class="flex gap-2 flex-col p-4"
          v-else
        >
          <h4 class="text-sm uppercase">No results found</h4>
          <p class="text-sm">Please try searching for something else or remove some filters</p>
        </div>
      </div>
      <!-- Pagination -->
      <Pagination
        :totalPages="totalPages"
        :activePage="activePage"
        :pageSize="pageSize"
        :count="searchResults.count"
        @update:activePage="handlePageClick"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSearch } from '../composables/useSearch'

import ClearButton from './ui/ClearButton.vue'
import LoadingSpinner from './ui/LoadingSpinner.vue'
import Pagination from './ui/Pagination.vue'
import FilterButton from './ui/FilterButton.vue'

import SearchIcon from '../svg/SearchIcon.vue'
import Betashares from '../svg/betashares.vue'

import SearchItem from './SearchItem.vue'
import FilterBar from './FilterBar.vue'

import { useDebounceFn } from '@vueuse/core'

const { searchResultsData, isLoading, hasCompletedSearch, clearResults, startSearch } = useSearch()

const searchText = ref('')
const searchFilters = ref({})
const sortFilter = ref('five_year_return.desc')

const activePage = ref(1)
const pageSize = ref(10)
const isFilterBarOpen = ref(false)


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

  doSearch()
})

const toggleFilterBar = () => {
  isFilterBarOpen.value = !isFilterBarOpen.value
}

const updateSort = (sort: string) => {
  sortFilter.value = sort
  activePage.value = 1
  doSearch()
}

const clearSort = () => {
  activePage.value = 1
  doSearch()
}

const doSearch = () => {
  if (searchText.value.length < 2) return
  isLoading.value = true

  debounceSearch()
}

const debounceSearch = useDebounceFn(() => {
  startSearch(searchText.value, activePage.value, searchFilters.value, sortFilter.value)
}, 800)

const updateFilters = (filters: object) => {
  searchFilters.value = filters
  activePage.value = 1
  doSearch()
}

const handlePageClick = (page: number) => {
  activePage.value = page
  doSearch()
}

const handleClearButton = () => {
  searchText.value = ''
  searchFilters.value = {}
  clearResults()
}

</script>

<style scoped></style>
