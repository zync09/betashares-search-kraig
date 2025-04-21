<template>
  <li>
    <button class="bg-primary hover:brightness-125 text-white rounded-full px-2 py-1 text-sm">{{ result.symbol }}</button>
    <h4 class="text-sm uppercase">{{ result.display_name }}</h4>
  </li>
</template>

<script setup lang="ts">
import type { IResult } from '../composables/Search'

interface SearchItemProps {
  result: IResult
}

const props = defineProps<SearchItemProps>()
</script>
