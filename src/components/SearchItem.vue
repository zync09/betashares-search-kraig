<template>
  <button class="hover:bg-secondary-300 transition-all duration-300 px-4 py-3 flex gap-1 items-center" v-if="!isLoading">
    <div class="bg-primary hover:brightness-125 text-white w-14 justify-center rounded-full px-2 py-1 text-xs flex gap-2 items-center">
      <FlagshipIcon v-if="result.is_flagship_fund" />
      <span>{{ result.symbol }}</span>
    </div>
    <h4 class="text-sm uppercase">{{ result.display_name }}</h4>
  </button>
  <div class="px-4 py-3 flex gap-3 items-center" v-else>
    <div class="w-14 h-6 rounded-full  relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer -translate-x-full "></div>
    </div>
    <div class="h-5 w-full  rounded-full  relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer -translate-x-full "></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IResult } from '../composables/useSearch'
import FlagshipIcon from '../svg/FlagshipIcon.vue'


interface SearchItemProps {
  result: IResult
  isLoading: boolean
}

const props = defineProps<SearchItemProps>()
</script>
