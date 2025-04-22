<template>
  <div
    class="bg-white flex flex-col md:flex-row font-montserrat font-semibold justify-between items-center gap-y-2 px-4 py-1 rounded-b-xl border-t-black/10 border-t"
    v-if="count > 0"
  >
    <div
      class="py-1 flex  items-baseline overflow-hidden divide-x"
      v-auto-animate
      v-if="totalPages > 1"
    >
      <button
        class="size-6 text-xs hover:bg-slate-100 hover:text-black transition-all duration-300"
        :class="{
          'bg-secondary text-black': page !== activePage,
          'bg-primary text-white': page === activePage,
          'rounded-l-lg': page === 1,
          'rounded-r-lg': page === totalPages
        }"
        v-for="page in totalPages"
        :key="page"
        @click="handlePageClick(page)"
      >{{ page }}</button>
    </div>
    <div class="text-xs">{{ activePage * pageSize - pageSize + 1 }} - {{ Math.min(activePage * pageSize, count) }} | {{ count }} results</div>
  </div>
</template>

<script setup lang="ts">
interface IPaginationProps {
  totalPages: number
  activePage: number
  pageSize: number
  count: number
}
const emit = defineEmits(['update:activePage'])

defineProps<IPaginationProps>()

const handlePageClick = (page: number) => {
  emit('update:activePage', page)
}

</script>

<style scoped></style>