<template>
  <li class="hover:bg-secondary-300 transition-all duration-300 px-4 py-2">
    <button class="bg-primary hover:brightness-125 text-white rounded-full px-2 py-1 text-xs flex gap-2 items-center">
      <FlagshipIcon v-if="result.is_flagship_fund" />
      <span>{{ result.symbol }}</span>
    </button>
    <h4 class="text-sm uppercase">{{ result.display_name }}</h4>
  </li>
</template>

<script setup lang="ts">
import type { IResult } from '../composables/useSearch'
import FlagshipIcon from '../svg/FlagshipIcon.vue'

interface SearchItemProps {
  result: IResult
}

const props = defineProps<SearchItemProps>()
</script>
