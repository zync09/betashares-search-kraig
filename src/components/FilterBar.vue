<template>
  <div class="bg-white p-4 border-b-black/20 border-b shadow-2xl">
    <div>
      <label class="text-md text-primary">Dividend Frequency</label>
      <div class="flex flex-wrap gap-4 pb-8 pt-2">
        <Checkbox
          v-for="(value, key) in DividendFrequency"
          v-model="filters.dividend_frequency"
          :checked="filters.dividend_frequency.includes(value)"
          :key="key"
          :id="`dividendFrequency-${key}`"
          :value="value"
          :label="value"
        />
      </div>
    </div>

    <div>
      <label class="text-md text-primary">Management Approach</label>
      <div class="flex flex-wrap gap-4 pb-8 pt-2">
        <Checkbox
          v-for="(value, key) in ManagementApproach"
          v-model="filters.management_approach"
          :checked="filters.management_approach.includes(value)"
          :key="key"
          :id="`managementApproach-${key}`"
          :value="value"
          :label="key"
        />
      </div>
    </div>

    <div>
      <label class="text-md text-primary">Investment Suitability</label>
      <div class="flex flex-wrap gap-4 pb-8 pt-2">
        <Checkbox
          v-for="(value, key) in InvestmentSuitability"
          v-model="filters.investment_suitability"
          :checked="filters.investment_suitability.includes(value)"
          :key="key"
          :id="`investmentSuitability-${key}`"
          :value="value"
          :label="value"
        />
      </div>
    </div>

    <div>
      <label class="text-md text-primary">Asset Category</label>
      <div class="flex flex-wrap gap-4 pb-8 pt-2">
        <Checkbox
          v-for="(value, key) in AssetCategory"
          v-model="filters.asset_category"
          :checked="filters.asset_category.includes(value)"
          :key="key"
          :id="`assetCategory-${key}`"
          :value="value"
          :label="value"
        />
      </div>
    </div>




    <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">

      <div class="flex flex-col">
        <label class="text-sm text-primary mb-1">One Year Return (%)</label>
        <div class="flex gap-2 items-center">
          <input
            type="number"
            v-model="filters.one_year_return[0]"
            placeholder="Min"
            class="px-2 py-1 rounded text-xs w-14"
          />
          <Slider
            v-model="filters.one_year_return"
            range
            class="flex-1 w-full"
          />
          <input
            type="number"
            v-model="filters.one_year_return[1]"
            placeholder="Max"
            class="px-2 py-1 rounded text-xs w-14"
          />
        </div>
        <button @click="filters.one_year_return = []">Clear</button>
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-primary mb-1">Five Year Return (%)</label>
        <div class="flex gap-2 items-center">
          <input
            type="number"
            v-model="filters.five_year_return[0]"
            placeholder="Min"
            class="px-2 py-1 rounded text-xs w-14"
          />
          <Slider
            v-model="filters.five_year_return"
            range
            class="flex-1 w-full"
          />
          <input
            type="number"
            v-model="filters.five_year_return[1]"
            placeholder="Max"
            class="px-2 py-1 rounded text-xs w-14"
          />
        </div>
        <button @click="filters.five_year_return = []">Clear</button>
      </div>

    </div>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">

      <div class="flex flex-col">
        <label class="text-sm text-primary mb-1">Management Fee (%)</label>
        <div class="flex gap-2 items-center">
          <input
            type="number"
            v-model="filters.management_fee[0]"
            placeholder="Min"
            class="px-2 py-1 rounded text-xs w-14"
          />
          <Slider
            v-model="filters.management_fee"
            range
            class="flex-1 w-full"
          />
          <input
            type="number"
            v-model="filters.management_fee[1]"
            placeholder="Max"
            class="px-2 py-1 rounded text-xs w-14"
          />
        </div>
        <button @click="filters.management_fee = []">Clear</button>
      </div>

      <div class="flex flex-col">
        <label class="text-sm text-primary mb-1">Fund Size ($M)</label>
        <div class="flex gap-2 items-center">
          <input
            type="number"
            v-model="filters.fund_size[0]"
            placeholder="Min"
            class="px-2 py-1 rounded text-xs w-14"
          />
          <Slider
            v-model="filters.fund_size"
            range
            class="flex-1 w-full"
          />
          <input
            type="number"
            v-model="filters.fund_size[1]"
            placeholder="Max"
            class="px-2 py-1 rounded text-xs w-14"
          />
        </div>
        <button @click="filters.fund_size = []">Clear</button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { watchDeep } from '@vueuse/core'
import Checkbox from './ui/Checkbox.vue'

import { InvestmentSuitability, DividendFrequency, ManagementApproach, AssetCategory } from '../composables/useSearch'

const emits = defineEmits(['update:filters'])

const filters = ref({
  dividend_frequency: [] as string[],
  management_approach: [] as string[],
  investment_suitability: [] as string[],
  asset_category: [] as string[],
  one_year_return: [0, 100],
  five_year_return: [0, 100],
  management_fee: [0, 100],
  fund_size: [0, 100],
})

watchDeep(filters, (newValue) => {
  //only remove empty arrays and null values if field is dividend_frequency or management_approach or investment_suitability or fund_category 
  let filteredValue = Object.fromEntries(
    Object.entries(newValue).filter(([key, value]) => {
      if (key === 'dividend_frequency' || key === 'management_approach' || key === 'investment_suitability' || key === 'fund_category') {
        return Array.isArray(value) && value.length > 0
      }
      return value !== null
    })
  )
  //if any of the other fields have min or max as null, remove the field individually
  Object.entries(filteredValue).forEach(([key, value]) => {
    if (value.min === null || value.max === null) {
      delete filteredValue[key]
    }
  })

  emits('update:filters', filteredValue)
})

</script>

<style scoped>
select {
  min-width: 200px;
  height: 100px;
}
</style>