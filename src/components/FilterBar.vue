<template>
  <div class="bg-white p-4 border-b-black/20 border-b shadow-2xl">
    <div>
      <div class="text-md text-primary">Dividend Frequency</div>
      <div class="flex flex-wrap gap-2 pb-8 pt-2">
        <template
          v-for="(value, key) in DividendFrequency"
          :key="key"
        >
          <Checkbox
            v-model="filters.dividend_frequency"
            :inputId="`dividendFrequency-${key}`"
            name="size"
            :value="value"
          />
          <label
            :for="`dividendFrequency-${key}`"
            class="text-sm"
          >{{ value }}</label>
        </template>
      </div>
    </div>

    <div>
      <label class="text-md text-primary">Management Approach</label>
      <div class="flex flex-wrap gap-2 pb-8 pt-2">
        <template
          v-for="(value, key) in ManagementApproach"
          :key="key"
        >
          <Checkbox
            v-model="filters.management_approach"
            :checked="filters.management_approach.includes(value)"
            :inputId="`managementApproach-${key}`"
            :value="value"
            :label="value"
          />
          <label
            :for="`managementApproach-${key}`"
            class="text-sm"
          >{{ value }}</label>
        </template>
      </div>
    </div>

    <div>
      <label class="text-md text-primary">Investment Suitability</label>
      <div class="flex flex-wrap gap-2 pb-8 pt-2">
        <template
          v-for="(value, key) in InvestmentSuitability"
          :key="key"
        >
          <Checkbox
            v-model="filters.investment_suitability"
            :checked="filters.investment_suitability.includes(value)"
            :inputId="`investmentSuitability-${key}`"
            :value="value"
            :label="value"
          />
          <label
            :for="`investmentSuitability-${key}`"
            class="text-sm"
          >{{ value }}</label>
        </template>
      </div>
    </div>

    <div>
      <label class="text-md text-primary">Asset Category</label>
      <div class="flex flex-wrap gap-2 pb-8 pt-2">
        <template
          v-for="(value, key) in AssetCategory"
          :key="key"
        >
          <Checkbox
            v-model="filters.asset_category"
            :checked="filters.asset_category.includes(value)"
            :inputId="`assetCategory-${key}`"
            :value="value"
            :label="value"
          />
          <label
            :for="`assetCategory-${key}`"
            class="text-sm"
          >{{ value }}</label>
        </template>
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

    <div class="flex gap-2 justify-end border-t border-t-black/20 pt-4 items-center flex-wrap">
      <h4>Sort By:</h4>
      <Select
        v-model="sortMetric"
        :options="sortMetricOptions"
        size="small"
        optionLabel="name"
        placeholder="Sort By"
        class="w-full md:w-56"
      />
      <Select
        v-model="sortDirection"
        :options="sortDirectionOptions"
        size="small"
        optionLabel="name"
        placeholder="Sort Direction"
        class="w-full md:w-56"
      />
      <Button
        label="Clear Sort"
        size="small"
        class="w-full md:w-56"
        @click="clearSort"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { watchArray, watchDeep } from '@vueuse/core'

import { InvestmentSuitability, DividendFrequency, ManagementApproach, AssetCategory } from '../composables/useSearch'

const emits = defineEmits(['update:filters', 'update:sort', 'clearSort'])

const filters = ref({
  dividend_frequency: [] as string[],
  management_approach: [] as string[],
  investment_suitability: [] as string[],
  asset_category: [] as string[],
  one_year_return: [0, 100],
  five_year_return: [0, 100],
  management_fee: [0, 100],
  fund_size: [0, 100000],
})

const sortMetric = ref({ name: 'Five Year Return', value: 'five_year_return' })
const sortDirection = ref({ name: 'Descending', value: 'desc' })

const clearSort = () => {
  sortMetric.value = { name: 'Five Year Return', value: 'five_year_return' }
  sortDirection.value = { name: 'Descending', value: 'desc' }
  emits('clearSort')
}

const sortDirectionOptions = ref([
  { name: 'Ascending', value: 'asc' },
  { name: 'Descending', value: 'desc' },
])

const sortMetricOptions = ref([
  { name: 'One Year Return', value: 'one_year_return' },
  { name: 'Five Year Return', value: 'five_year_return' },
  { name: 'Management Fee', value: 'management_fee' },
  { name: 'Fund Size', value: 'fund_size' },
])

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

  emits('update:filters', filteredValue)
})

watchArray([sortMetric, sortDirection], () => {
  //get the sort field and direction, return it like this: {"order_by": "one_year_return.asc"}
  if (!sortMetric.value) return
  if (!sortDirection.value) return
  const sort = `${sortMetric.value.value}.${sortDirection.value.value}`
  emits('update:sort', sort)
})

</script>

<style scoped>
select {
  min-width: 200px;
  height: 100px;
}
</style>